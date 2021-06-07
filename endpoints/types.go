package main

// import "time"

type Pool struct {
	Id       string  `json:"id,omitempty"`
	TokenA   string  `json:"tokenA,omitempty"`
	TokenB   string  `json:"tokenB,omitempty"`
	Volume   float64 `json:"volume,omitempty"`
	Reserves float64 `json:"reserves,omitempty"`
	Apy      float64 `json:"apy,omitempty"`
	Fees     float64 `json:"fees,omitempty"`
}

type Pools []Pool

type timeSeries struct {
	Value     []float64 `json:"value,omitempty"`
	Timestamp []string  `json:"timestamp,omitempty"`
}

type poolMetrics struct {
	Id          string     `json:"id,omitempty"`
	InvestUrl   string     `json:"investUrl,omitempty"`
	Duration    string     `json:"duration,omitempty"`
	Safu        int        `json:"safuFactor, omitempty"`
	Drawdown    timeSeries `json:"drawdown,omitempty"`
	Pnl         timeSeries `json:"pnl,omitempty"`
	Il          timeSeries `json:"il,omitempty"`
	Volumes     timeSeries `json:"volumes,omitempty"`
	Reserves    timeSeries `json:"reserves,omitempty"`
	HoldPnl     timeSeries `json:"holdPnl,omitempty"`
	TokenAPrice timeSeries `json:"tokenAprice,omitempty"`
	TokenBPrice timeSeries `json:"tokenBprice,omitempty"`
}

type Farm struct {
	Id         string  `json:"id,omitempty"`
	TokenA     string  `json:"tokenA,omitempty"`
	TokenB     string  `json:"tokenB,omitempty"`
	Liquidity  float64 `json:"liquidity,omitempty"`
	Apr        float64 `json:"total_apr,omitempty"`
	RiskFactor float64 `json:"riskFactor, omitempty"`
}

type Farms []Farm

type farmMetrics struct {
	Id          string     `json:"id,omitempty"`
	InvestUrl   string     `json:"investUrl,omitempty"`
	Duration    string     `json:"duration,omitempty"`
	Safu        int        `json:"safuFactor, omitempty"`
	Drawdown    timeSeries `json:"drawdown,omitempty"`
	Pnl         timeSeries `json:"pnl,omitempty"`
	Reserves    timeSeries `json:"reserves,omitempty"`
	TokenAPrice timeSeries `json:"tokenAprice,omitempty"`
	TokenBPrice timeSeries `json:"tokenBprice,omitempty"`
	HoldPnl     timeSeries `json:"holdPnl,omitempty"`
}

type algoMetrics struct {
	Id               int     `json:"id,omitempty"`
	StrateyName      string  `json:"bot_name,omitempty"`
	Drawdown         float64 `json:"max_drawdown,omitempty"`
	CumulativeReturn float64 `json:"overall_return,omitempty"`
	Sharpe           float64 `json:"sharpe,omitempty"`
	Safu             float64 `json:"safu,omitempty"`
	BonfidaPoolLink  string  `json:"bonfida_pool_link,omitempty"`
	MarketName       string  `json:"market,omitempty"`
}
