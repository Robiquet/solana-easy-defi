package main

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"time"
)

func simpleHello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"ok"}`))
}

func getFarms(w http.ResponseWriter, r *http.Request) {
	ray_farms := getRaydiumFrams(db)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(ray_farms); err != nil {
		panic(err)
	}
}

func getPools(w http.ResponseWriter, r *http.Request) {
	pools := getRaydiumPools(db)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(pools); err != nil {
		panic(err)
	}
}

func getPool(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	// duration := vars["duration"]
	var metric poolMetrics
	if len(id) > 0 {
		metric = getMetricsForRaydium(db, time.Now(), id, 100.0)
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(metric); err != nil {
		panic(err)
	}
}

func getFarm(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	metric := getFarmMetrics(db, time.Now(), id, 100.0)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(metric); err != nil {
		panic(err)
	}
}

func getBots(w http.ResponseWriter, r *http.Request) {
	var metrics []algoMetrics
	strateg1 := algoMetrics{
		Id:               1,
		Drawdown:         -9.73,
		StrateyName:      "ml movementum",
		CumulativeReturn: 214.32,
		Sharpe:           3.35,
		Safu:             9,
		BonfidaPoolLink:  "https://bots.bonfida.com/#/pool/BW2SCDDndCNUpSt5KJh7WPk7hKpx38WRMEUYgr4KfLf5",
		MarketName:       "BTC-USDT",
	}

	strateg2 := algoMetrics{
		Id:               2,
		Drawdown:         -24.86,
		StrateyName:      "mean reverting",
		CumulativeReturn: 54.99,
		Sharpe:           1.15,
		Safu:             6,
		BonfidaPoolLink:  "https://bots.bonfida.com/#/pool/3MJmApACMnyZ4Pzwa71DB2QBEUYai7ZYLAQhQgdwNA2P",
		MarketName:       "FIDA-USDC",
	}

	strateg3 := algoMetrics{
		Id:               3,
		Drawdown:         -10.053,
		StrateyName:      "filtered trend",
		CumulativeReturn: 138.41,
		Sharpe:           3.78,
		Safu:             8,
		BonfidaPoolLink:  "https://bots.bonfida.com/#/pool/BW2SCDDndCNUpSt5KJh7WPk7hKpx38WRMEUYgr4KfLf5",
		MarketName:       "ETH-USDT",
	}

	strateg4 := algoMetrics{
		Id:               4,
		Drawdown:         -12.99,
		StrateyName:      "short term movementum",
		CumulativeReturn: 56.02,
		Sharpe:           2.33,
		Safu:             4,
		BonfidaPoolLink:  "https://bots.bonfida.com/#/pool/3MJmApACMnyZ4Pzwa71DB2QBEUYai7ZYLAQhQgdwNA2P",
		MarketName:       "BTC-USDC",
	}

	metrics = append(metrics, strateg1, strateg2, strateg3, strateg4)

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(metrics); err != nil {
		panic(err)
	}
}
