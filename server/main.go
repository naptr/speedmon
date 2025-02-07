package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Printf("test\n")
    fmt.Printf("%s[]", os.Environ())
}
