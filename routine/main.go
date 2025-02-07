package main

import (
    "fmt"
    "github.com/joho/godotenv"
)

func main() {
    env, err := godotenv.Read()

    if err != nil {
	panic(err.Error())
    }

    for key, value := range(env) {
	fmt.Printf("%s=%s\n", key, value)
    }
}
