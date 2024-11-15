import './wasm_exec.js';

/**
 * A JavaScript library for using Go-based regex matching via WebAssembly.
 */
class GolangRegex {
    static _initialized = false;
    static _goInstance = null;

    /**
     * Initializes the WebAssembly module for regex functionality.
     * @param {string} wasmPath - The path to the compiled WebAssembly file.
     * @returns {Promise<void>} Resolves when initialization is complete.
     * @throws {Error} If wasm_exec.js is not loaded or initialization fails.
     */
    static async initialize(wasmPath) {
        if (this._initialized) {
            throw new Error("GolangRegex has already been initialized.");
        }

        if (typeof Go === "undefined") {
            throw new Error("wasm_exec.js must be loaded before using GolangRegex.");
        }

        const go = new Go();
        const wasmModule = await WebAssembly.instantiateStreaming(fetch(wasmPath), go.importObject);
        go.run(wasmModule.instance);

        this._goInstance = go;
        this._initialized = true;
    }

    /**
     * Checks if a given text matches a regex pattern.
     * @param {string} pattern - The regex pattern to match.
     * @param {string} text - The text to be matched against the pattern.
     * @returns {boolean} `true` if the text matches the pattern, `false` otherwise.
     * @throws {Error} If the library has not been initialized or the regex pattern is invalid.
     */
    static match(pattern, text) {
        if (!this._initialized) {
            throw new Error("GolangRegex has not been initialized. Call initialize() first.");
        }

        try {
            return matchRegex(pattern, text); // Assumes `matchRegex` is exposed by the WebAssembly module.
        } catch (error) {
            throw new Error(`Regex matching error: ${error.message}`);
        }
    }
}



export default GolangRegex;
