/**
 * A JavaScript library for using Go-based regex matching via WebAssembly.
 */
class RegexLib {
    /**
     * Initializes the RegexLib instance, loading the WebAssembly module.
     * @param {string} wasmPath - The path to the compiled WebAssembly file.
     * @returns {Promise<RegexLib>} A promise that resolves to the initialized instance.
     */
    static async initialize(wasmPath) {
        const go = new Go();
        const wasmModule = await WebAssembly.instantiateStreaming(fetch(wasmPath), go.importObject);
        go.run(wasmModule.instance);
        return new RegexLib();
    }

    /**
     * Checks if a given text matches a regex pattern.
     * @param {string} pattern - The regex pattern to match.
     * @param {string} text - The text to be matched against the pattern.
     * @returns {boolean} `true` if the text matches the pattern, `false` otherwise.
     * @throws {Error} Throws an error if the regex pattern is invalid.
     */
    match(pattern, text) {
        try {
            return matchRegex(pattern, text);
        } catch (error) {
            throw new Error("Invalid regex pattern or WebAssembly error: " + error.message);
        }
    }
}

export default RegexLib;

