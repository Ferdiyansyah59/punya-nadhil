package main

import (
	"fmt"
	"sort"
	"strings"
)

func main() {
	str1 := "listen"
	str2 := "silent"
	
	str1 = strings.ToLower(str1)
	str2 = strings.ToLower(str2)

	if len(str1) != len (str2) {
		fmt.Println("Bukan anagram")
		return
	}

	s1 := strings.Split(str1, "")
	s2 := strings.Split(str2, "")

	sort.Strings(s1)
	sort.Strings(s2)

	sorted1 := strings.Join(s1, "")
	sorted2 := strings.Join(s2, "")

	if sorted1 == sorted2 {
		fmt.Println("Anagram")
	}else {
		fmt.Println("Bukan anagram")
	}

}