package main

import "math/rand"

var minSpeed int = 0
var maxSpeed int = 140

func GenerateSpeed() (speed int) {
    return minSpeed + rand.Intn(maxSpeed-minSpeed)
}

func GenerateAngle() (angle, speed int) {
    speedometerDeg := 180
    currentSpeed := GenerateSpeed()
    angle = currentSpeed * speedometerDeg / maxSpeed

    return angle, currentSpeed
}

func GenerateRandomZeroOrOne() int {
    numbers := []int{0, 1}

    rand.Shuffle(len(numbers), func (i, j int) {
	numbers[i], numbers[j] = numbers[j], numbers[i]
    })

    return numbers[0]
}

func GenerateSeatbeltStatus() int {
    return GenerateRandomZeroOrOne()
}

func GenerateParkingStatus() int {
    return GenerateRandomZeroOrOne()
}
