package main

import (
	"fmt"
	"syscall/js"
)

// This calls a JS function from Go.
func main() {
	c := make(chan struct{})
	println("Printing test function multiply, 2 * 5 = ", multiply(2, 5)) // expecting 5
	tryFetch()
	<-c
}

func tryFetch() interface{} {
	fetchResponse := js.Global().Call("fetch", "https://jsonplaceholder.typicode.com/todos/1")
	fmt.Println(fetchResponse.String())
	return nil
}

func multiply(x, y int) int {
	return x * y
}
