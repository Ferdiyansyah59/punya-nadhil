package main

import (
	"fmt"
	"strings"
)

func main() {
	input := "Kasur Rusak"

	input = strings.ToLower(input)

	isPalindrom := true
	left := 0
	right := len(input) - 1

	for left < right {
		if input[left] != input[right] {
			isPalindrom = false
			break
		}
		left++
		right--
	}
	fmt.Printf("Apakah %s adalah palinfrom %v", input, isPalindrom)
}