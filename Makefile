.PHONY:build
build:
	@bash -c "GOOS=js GOARCH=wasm go build -o goregex.wasm main.go"

.PHONY:run
run:
	@python3 -m http.server 8080
