package main

import (
	"context"
	"fmt"
	"os"
	"strconv"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

type GaugeState struct {
    id 		string
    speed	int
    angle	int
    seatbelt	bool
    parking	bool
}

func TestConnection() {
    env, err := godotenv.Read()

    if err != nil {
	panic(err)
    }

    connString := "postgresql://" + env["SPEEDMON_DB_USER"] + ":" +
		  env["SPEEDMON_DB_PASSWORD"] + "@" + env["SPEEDMON_DB_HOST"] +
		  ":" + env["SPEEDMON_DB_PORT"] + "/" + env["SPEEDMON_DB_NAME"]
    conn, err := pgx.Connect(context.Background(), connString)

    if err != nil {
	fmt.Fprintf(os.Stderr, "Unable to connect to database %v", err)
	os.Exit(1)
    }

    defer conn.Close(context.Background())
    
    insertQuery := "INSERT INTO testing.state (speed, angle, seatbelt, parking) VALUES (@speed, @angle, @seatbelt, @parking)"

    angle, speed := GenerateAngle()
    seatbelt := GenerateSeatbeltStatus()
    parking := GenerateParkingStatus()

    _, err = conn.Exec(context.Background(), insertQuery, &pgx.NamedArgs{
	"speed": speed,
	"angle": angle,
	"seatbelt": strconv.Itoa(seatbelt),
	"parking": strconv.Itoa(parking),
    })

    if err != nil {
	fmt.Fprintf(os.Stderr, "an error occured while inserting to testing.state %v\n", err)
	os.Exit(1)
    }

    selectQuery := "SELECT id, speed, angle, seatbelt, parking FROM testing.state"

    rows, err := conn.Query(context.Background(), selectQuery)

    if err != nil {
	fmt.Fprintf(os.Stderr, "cannot querying %v\n", err)
	os.Exit(1)
    }

    defer rows.Close()

    var states []GaugeState

    for rows.Next() {
	var state GaugeState
	err := rows.Scan(
	    &state.id,
	    &state.speed,
	    &state.angle,
	    &state.seatbelt,
	    &state.parking,
	)

	if err != nil {
	    fmt.Fprintf(os.Stderr, "err: %v\n", err)
	    os.Exit(1)
	}

	states = append(states, state)
    }

    fmt.Printf("%v\n", states)
}
