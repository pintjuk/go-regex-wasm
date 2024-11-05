// regex.go
package main

import (
    "regexp"
    "syscall/js"
)

func match(this js.Value, p []js.Value) interface{} {
    pattern := p[0].String()
    text := p[1].String()
    re, err := regexp.Compile(pattern)
    if err != nil {
        return err.Error()
    }
    return re.MatchString(text)
}

func main() {
    js.Global().Set("matchRegex", js.FuncOf(match))
    select {}
}

