package main

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql" // we are importing the MySQL driver package for its side effect and we will not use it explicitly anywhere in our code.
)

type LogsDbConfig struct {
	Hostname string `mapstructure:"hostname"`
	Username string `mapstructure:"username"`
	Password string `mapstructure:"password"`
	DbName   string `mapstructure:"dbname"`
}

func GetDBConnection() (*sql.DB, error) {

	dbConfig := LogsDbConfig{
		Hostname: os.Getenv("MYSQL_HOSTNAME"),
		Username: os.Getenv("MYSQL_USER"),
		Password: os.Getenv("MYSQL_PASSWORD"),
		DbName:   os.Getenv("MYSQL_DATABASE"),
	}

	dataSourceName := fmt.Sprintf("%s:%s@tcp(%s)/%s?", dbConfig.Username, dbConfig.Password, dbConfig.Hostname, dbConfig.DbName)
	fmt.Println("dataSourceName: ", dataSourceName)
	db, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		return nil, err
	}
	return db, nil
}
