package main

import (
	"database/sql"
	"log"
	"time"
)

func getPrices(coin string, duration string, db *sql.DB) ([]float64, []string) {
	priceQuery := "SELECT log_datetime, prices FROM coingecko_coins_price_data WHERE coin_id = ? AND (log_datetime <= ? AND log_datetime > ? - INTERVAL 10 DAY);"

	rows, err := db.Query(
		priceQuery,
		coin,
		duration,
		duration,
	)
	if err != nil {
		log.Println("[1] Error querying coinA data: ", err)
	}
	defer rows.Close()
	var prices []float64
	var timestamps []string
	for rows.Next() {
		var price float64
		var timestamp string
		rows.Scan(&timestamp, &price)
		prices = append(prices, price)
		// log.Println("price", price)
		timestamps = append(timestamps, timestamp)
	}
	return prices, timestamps
}

func getMetricsForRaydium(db *sql.DB, duration time.Time, pool_id string, usd_amount float64) poolMetrics {
	// 1. Fetch apy and reserves
	apyQuery := "SELECT log_datetime, apy, liquidity_locked FROM raydium_pools_apy WHERE pool_identifier = ? AND (log_datetime <= ? AND log_datetime > ? - INTERVAL 1 DAY);"
	var apys, reserves []float64
	var timestamps []string

	rows, err := db.Query(
		apyQuery,
		pool_id,
		duration.String(),
		duration.String(),
	)
	if err != nil {
		log.Println("[0] Error querying data: ", err)
	}
	defer rows.Close()
	for rows.Next() {
		var apy, liquidity float64
		var timestamp string
		rows.Scan(&timestamp, &apy, &liquidity)
		// log.Println(apy)
		apys = append(apys, apy/100.0)
		timestamps = append(timestamps, timestamp)
		reserves = append(reserves, liquidity)
	}

	coinA, coinB := func() (string, string) {
		c := PoolIDToCoinIDsMap[pool_id]
		return c[0], c[1]
	}()

	// 2. Fetch the price data for tokens
	pricesA, timeSeriesA := getPrices(coinA, duration.String(), db)
	pricesB, timeSeriesB := getPrices(coinB, duration.String(), db)

	// 3. Get Hold Pnl
	var length int
	if len(pricesA) > len(pricesB) {
		length = len(pricesB)
	} else {
		length = len(pricesA)
	}
	holdPnl := getHoldPnl(pricesA[:length], pricesB[:length], usd_amount)

	// 4. Calculate the impermanent loss and drawdown and pnl
	drawdowns := getDrawDown(apys)
	pnls := getPnl(apys, usd_amount)
	ils := getIL(pricesA, pricesB)

	var volume []float64

	pnl_length := getMin(len(pnls), len(holdPnl))
	safu := getRiskFactor(pnls[:pnl_length], holdPnl[:pnl_length], drawdowns)

	metrics := poolMetrics{
		Id:          pool_id,
		InvestUrl: PoolIDToUrl[pool_id],
		Duration:    duration.String(),
		Safu:        safu,
		Drawdown:    timeSeries{drawdowns, timestamps},
		Pnl:         timeSeries{pnls, timestamps},
		Il:          timeSeries{ils, timeSeriesA[:len(ils)]},
		Volumes:     timeSeries{volume, timestamps},
		Reserves:    timeSeries{reserves, timestamps},
		HoldPnl:     timeSeries{holdPnl, timeSeriesA[:length]},
		TokenAPrice: timeSeries{pricesA, timeSeriesA},
		TokenBPrice: timeSeries{pricesB, timeSeriesB},
	}

	return metrics
}

func getFarmMetrics(db *sql.DB, duration time.Time, pool_id string, usd_amount float64) farmMetrics {
	// 1. Fetch apy, volume and reserves
	apyQuery := "SELECT log_datetime , liquidity, apr FROM raydium_farms_apr WHERE pool_identifier = ? AND (log_datetime <= ? AND log_datetime > ? - INTERVAL 10 DAY);"
	var apys, reserves []float64
	var timestamps []string
	rows, err := db.Query(
		apyQuery,
		pool_id,
		duration.String(),
		duration.String(),
	)
	if err != nil {
		log.Println("[0] Error querying data: ", err)
	}
	defer rows.Close()
	for rows.Next() {
		var apy, liquidity float64
		var timestamp string
		err := rows.Scan(&timestamp, &liquidity, &apy)
		if err != nil {
			log.Fatal("Error reading rows", err)
		}
		// log.Println(apy)
		apys = append(apys, apy/100.0)
		reserves = append(reserves, liquidity)
		timestamps = append(timestamps, timestamp)
	}

	coinA, coinB := func() (string, string) {
		c := PoolIDToCoinIDsMap[pool_id[:len(pool_id)-3]]
		// log.Println(c[0], c[1])
		return c[0], c[1]
	}()

	// 2. Fetch the price data for tokens
	pricesA, timeSeriesA := getPrices(coinA, duration.String(), db)
	pricesB, timeSeriesB := getPrices(coinB, duration.String(), db)

	// 3. Calculate the impermanent loss and drawdown and pnl
	drawdowns := getDrawDown(apys)
	pnls := getPnl(apys, usd_amount)

	// 4. Get Hold Pnl
	length := getMin(len(pricesA), len(pricesB))
	holdPnl := getHoldPnl(pricesA[:length], pricesB[:length], usd_amount)

	pnl_length := getMin(len(pnls), len(holdPnl))
	safu := getRiskFactor(pnls[:pnl_length], holdPnl[:pnl_length], drawdowns)

	metrics := farmMetrics{
		Id:          pool_id,
		InvestUrl: PoolIDToUrl[pool_id[:len(pool_id)-3]],
		Duration:    duration.String(),
		Safu:        safu - 2,
		Drawdown:    timeSeries{drawdowns, timestamps},
		Pnl:         timeSeries{pnls, timestamps},
		Reserves:    timeSeries{reserves, timestamps},
		TokenAPrice: timeSeries{pricesA, timeSeriesA},
		TokenBPrice: timeSeries{pricesB, timeSeriesB},
		HoldPnl:     timeSeries{holdPnl, timeSeriesA[:length]},
	}

	return metrics
}

func getRiskFactor(pnl []float64, holdPnl []float64, drawdown []float64) int {
	if len(pnl) == 0 || len(drawdown) == 0 {
		return 2
	}
	drawdown_duration := 0
	for i := 0; i < len(drawdown); i++ {
		if drawdown[i] >= 0 {
			drawdown_duration += 1
		}
	}
	drawdown_duration /= len(drawdown)

	pnl_duration := 0
	for i := 0; i < len(pnl); i++ {
		if pnl[i] > holdPnl[i] {
			pnl_duration += 1
		}
	}
	pnl_duration /= len(pnl)
	// log.Println(pnl_duration, drawdown_duration)
	return int(10 * (drawdown_duration + pnl_duration) / 2)
}
