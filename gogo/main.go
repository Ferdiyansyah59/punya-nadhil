package main

import "fmt"

func main() {
	for i := 1; i <=30; i++ {
		if i % 3 == 0 && i%5 == 0 {
			fmt.Println(i, " adalah kelipatan 3 dan 5")
		} else if i % 3 == 0 {
			fmt.Println(i, " adalah kelipatan 3")
		} else if i % 5 == 0 {
			fmt.Println(i, " adalah kelipatan 5")
		} else {
			fmt.Println(i, "Bukan kelipatan")
		}
	}
}