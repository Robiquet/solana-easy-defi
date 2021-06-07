package main

import (
	"database/sql"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"log"
	"net/http"
)

var (
	db  *sql.DB
	err error
)

func init() {
	// loads values from .env into the system
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading the environment variables")
	}
}

func main() {
	router := mux.NewRouter().StrictSlash(true)

	db, err = GetDBConnection()
	if err != nil {
		panic(err)
	}
	dbStats := db.Stats()
	log.Printf("DB Stats: %+v\n", dbStats)

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	log.Printf("DB ping successful: %+v\n", dbStats)
	router.HandleFunc("/", simpleHello)
	router.HandleFunc("/pools", getPools)
	router.HandleFunc("/pool/{id}", getPool)
	router.HandleFunc("/farms", getFarms)
	router.HandleFunc("/farm/{id}", getFarm)
	router.HandleFunc("/bots", getBots)
	log.Fatal(http.ListenAndServe(":80", router))
}
