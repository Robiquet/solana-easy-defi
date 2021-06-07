package main

import (
	"database/sql"
	"log"
)

func getRaydiumPools(dB *sql.DB) Pools {
	query := "select max(log_datetime), pool_identifier , liquidity_locked, apy from raydium_pools_apy group by pool_identifier;"
	var raydium_pools Pools
	rows, err := db.Query(query)
	if err != nil {
		log.Println("[0] Error querying data: ", err)
	}
	defer rows.Close()

	for rows.Next() {
		var temp Pool
		var out string
		rows.Scan(&out, &temp.Id, &temp.Reserves, &temp.Apy)
		temp.TokenA, temp.TokenB = func() (string, string) {
			c := PoolIDToCoinIDsMap[temp.Id]
			return c[0], c[1]
		}()
		raydium_pools = append(raydium_pools, temp)
	}

	return raydium_pools
}
