# `@pintjuk/golang-regex`

`@pintjuk/golang-regex` is a JavaScript package that enables regex matching using Go's regex engine via WebAssembly. It supports the full Go regex syntax, providing powerful and efficient matching capabilities directly in JavaScript environments.

## Features

- Full compatibility with Go's regex syntax.
- Efficient WebAssembly-based implementation.
- Simple integration with modern JavaScript/TypeScript projects.
- Supports lazy loading for optimized performance.

---

## Demo

For a complete demonstration of how to use this package, check out the live demo repository:

👉 **[Golang Regex Demo](https://github.com/pintjuk/golang-regex-demo)**

This demo includes a simple form interface and usage examples.

---

## Installation

Install the package via npm:

```bash
npm install @pintjuk/golang-regex
```

---

## Webpack Configuration for `.wasm` Files

To use `@pintjuk/golang-regex` in a Webpack-based project, configure Webpack to handle `.wasm` files and enable WebAssembly support.

### Example Webpack Configuration

```javascript
const path = require('path');

module.exports = {
  entry: './src/main.js', // Your JavaScript entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.wasm$/, // Handles `.wasm` files
        type: 'asset/resource', // Emits `.wasm` files as separate assets
      },
    ],
  },
  experiments: {
    asyncWebAssembly: true, // Enable asynchronous WebAssembly loading
  },
};
```

**Key Configuration Points**:
1. **`type: 'asset/resource'` for `.wasm` Files**:
   - Ensures `.wasm` files are correctly emitted to the output directory.
2. **Enable `asyncWebAssembly`**:
   - Allows WebAssembly files to be loaded asynchronously.

---

## Usage

### Basic Usage

Here’s how to use the package in a typical JavaScript application:

```javascript
import GolangRegex from '@pintjuk/golang-regex';
import wasmPath from '@pintjuk/golang-regex/goregex.wasm';

(async () => {
  await GolangRegex.initialize(wasmPath);

  const pattern = '^hello';
  const text = 'hello world';

  const isMatch = GolangRegex.match(pattern, text);
  console.log(isMatch ? 'Match found!' : 'No match found.');
})();
```

---

## Lazy Loading for Optimization

Since `@pintjuk/golang-regex` uses WebAssembly, it is recommended to lazy load the package to avoid blocking page load. Lazy loading ensures the WebAssembly module is initialized only when required.

### Example: Lazy Loading

```javascript
document.getElementById('regexButton').addEventListener('click', async () => {
  const GolangRegex = await import('@pintjuk/golang-regex');
  const wasmPath = await import('@pintjuk/golang-regex/goregex.wasm');

  await GolangRegex.initialize(wasmPath);

  const pattern = '^hello';
  const text = 'hello world';

  const isMatch = GolangRegex.match(pattern, text);
  console.log(isMatch ? 'Match found!' : 'No match found.');
});
```

### Why Lazy Loading?

1. **Improved Performance**: Loads the WebAssembly module only when needed, reducing initial load time.
2. **Non-blocking**: Keeps the main thread free during the initial page load.
3. **Scalability**: Ideal for applications where regex functionality is used conditionally or infrequently.

---

## Why WebAssembly is Loaded Asynchronously

WebAssembly modules, such as `goregex.wasm`, must be downloaded and compiled by the browser. Loading these modules asynchronously provides several benefits:

1. **Non-blocking Execution**: Prevents UI freezing during WebAssembly loading and compilation.
2. **Streaming Compilation**: The `WebAssembly.instantiateStreaming` method allows browsers to compile the WebAssembly module while it's still downloading, improving performance.
3. **Optimized Resource Loading**: Ensures that the WebAssembly module is only downloaded when needed.

---

## License

This project is licensed under the [MIT License](LICENSE).
