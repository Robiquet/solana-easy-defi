package main

import (
	"database/sql"
	"log"
	"strings"
)

func getRaydiumFrams(dB *sql.DB) Farms {
	query := "select max(log_datetime), pool_identifier , liquidity, apr from raydium_farms_apr group by pool_identifier;"
	var farms Farms
	rows, err := db.Query(query)
	if err != nil {
		log.Println("[0] Error querying data: ", err)
	}
	defer rows.Close()

	for rows.Next() {
		var temp Farm
		var out string
		rows.Scan(&out, &temp.Id, &temp.Liquidity, &temp.Apr)
		temp.TokenA, temp.TokenB = func() (string, string) {
			c := strings.Split(temp.Id, "-")
			return c[0], c[1][:len(c[1])-3]
		}()
		farms = append(farms, temp)
	}
	return farms
}
