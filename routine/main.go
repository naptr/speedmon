package main

import (
    "context"
    "fmt"
    "os"
    "strconv"

    "github.com/jackc/pgx/v5"
)

type Vehicle struct {
    id 		int8
    name	string
}

type VehicleState struct {
    id 			string
    vehicle_id		int8	
    speed		int8
    angle		int8
    parking		bool
    seatbelt		bool
}

func errorHelper(err error) {
    if err != nil {
	fmt.Fprintf(os.Stderr, "an error occured: %v\n", err)
    }
}

func GetVehicles() []Vehicle {
    conn, err := GetConnection()
    errorHelper(err)
    defer conn.Close(context.Background())

    rows, err := conn.Query(context.Background(), "SELECT id, name FROM testing.vehicles")
    errorHelper(err)
    defer rows.Close()

    var vehicles []Vehicle
    for rows.Next() {
	var vehicle Vehicle
	err := rows.Scan(&vehicle.id, &vehicle.name)
	errorHelper(err)

	vehicles = append(vehicles, vehicle)
    }

    return vehicles
}

func GetVehicleState(id int8) VehicleState {
    conn, err := GetConnection()
    errorHelper(err)
    defer conn.Close(context.Background())

    var vehicleState VehicleState
    query := `
    SELECT id, vehicle_id, speed, angle, parking, seatbelt
    FROM testing.vehicle_states vs
    WHERE vs.vehicle_id in ($1)`
    err = conn.QueryRow(context.Background(), query, []int8{ id }).Scan(
	&vehicleState.id,
	&vehicleState.vehicle_id,
	&vehicleState.speed,
	&vehicleState.angle,
	&vehicleState.parking,
	&vehicleState.seatbelt,
    )
    errorHelper(err)

    return vehicleState
}

func CreateVehicleState(id int8) int64 {
    conn, err := GetConnection()
    errorHelper(err)
    defer conn.Close(context.Background())

    query := `
    INSERT INTO testing.vehicle_states (vehicle_id, speed, angle, parking, seatbelt)
    VALUES (@vehicle_id, @speed, @angle, @parking, @seatbelt)
    RETURNING id
    `

    angle, speed := GenerateAngle()
    parking := GenerateParkingStatus()
    seatbelt := GenerateSeatbeltStatus()

    commandTag, err := conn.Exec(context.Background(), query, pgx.NamedArgs{
	"vehicle_id": id,
	"speed": speed,
	"angle": angle,
	"parking": strconv.Itoa(parking),
	"seatbelt": strconv.Itoa(seatbelt),
    })

    errorHelper(err)

    fmt.Printf("inserted rows: %d", commandTag.RowsAffected())

    return commandTag.RowsAffected()
}

func UpdateVehicleState(id int8) int64 {
    conn, err := GetConnection()
    errorHelper(err)

    defer conn.Close(context.Background())

    query := `
    UPDATE testing.vehicle_states vs
    SET (speed, angle, parking, seatbelt) = (@speed, @angle, @parking, @seatbelt)
    WHERE vs.vehicle_id in (@vehicle_id)
    `

    angle, speed := GenerateAngle()
    parking := GenerateParkingStatus()
    seatbelt := GenerateSeatbeltStatus()

    commandTag, err := conn.Exec(context.Background(), query, pgx.NamedArgs{
	"speed": speed,
	"angle": angle,
	"parking": strconv.Itoa(parking),
	"seatbelt": strconv.Itoa(seatbelt),
	"vehicle_id": id,
    })
    errorHelper(err)

    return commandTag.RowsAffected()
}

func StartRoutine() {
    vehicles := GetVehicles()

    affectedRowsChann := make(chan int64)
    vehicleChann := make(chan VehicleState)
    for _, vehicle := range(vehicles) {
	go func() {
	    vehicleChann <- GetVehicleState(vehicle.id)
	    affectedRowsChann <- UpdateVehicleState(vehicle.id)
	}()
    }

    for i := 0; i < len(vehicles); i++ {
	vs := <-vehicleChann
	ar := <-affectedRowsChann

	fmt.Printf("vs %v\n", vs)
	fmt.Printf("ar %v\n", ar)
    }
}

func main() {
    StartRoutine()
}
