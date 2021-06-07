package main

import (
	"log"
	"math"
)

func getPnl(apys []float64, usd_amount float64) []float64 {
	pnl := make([]float64, len(apys))
	factor := float64(365.0 * 24.0)
	pnl[0] = usd_amount * (1 + apys[0]/factor)
	for i := 1; i < len(apys); i++ {
		// log.Println(apys[i])
		pnl[i] = pnl[i-1] * (1 + apys[i]/factor)
		// log.Println(apys[i] / factor)

	}
	return pnl
}

func getHoldPnl(pricesA []float64, pricesB []float64, usd_amount float64) []float64 {
	pnl := make([]float64, len(pricesA))
	for i := 1; i < len(pricesA); i++ {
		pnl[i] = usd_amount / 2 * ((pricesA[i] / pricesA[0]) + (pricesB[i] / pricesB[0]))
		log.Println("pnl", pnl[i])
	}
	return pnl
}

func getDrawDown(returns []float64) []float64 {
	draw_downs := make([]float64, len(returns))
	max_returns := make([]float64, len(returns))
	pnls := getPnl(returns, 100.0)
	draw_downs[0] = 0
	max_returns[0] = pnls[0]
	for i := 1; i < len(returns); i++ {
		max_returns[i] = math.Max(max_returns[i-1], pnls[i])
		draw_downs[i] = -100.0 * (max_returns[i] - pnls[i]) / max_returns[i]
	}
	return draw_downs
}

func getIL(pricesA []float64, pricesB []float64) []float64 {
	// check for imbalanced price arrays
	var il_size int
	if len(pricesA) > len(pricesB) {
		il_size = len(pricesB)
	} else {
		il_size = len(pricesA)
	}

	il := make([]float64, il_size)

	for i := 1; i < il_size; i++ {
		asset_A_change := pricesA[i] / pricesA[0]
		asset_B_change := pricesB[i] / pricesB[0]
		ratio := asset_A_change / asset_B_change
		if ratio > 1 {
			ratio = 1 / ratio
		}
		il[i] = 1 - 2*math.Sqrt(ratio)/(1+ratio)
	}
	return il
}

func getMin(a int, b int) int {
	if a > b {
		return b
	} else {
		return a
	}
}
