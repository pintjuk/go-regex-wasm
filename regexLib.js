/**
 * A JavaScript library for using Go-based regex matching via WebAssembly.
 */
class GoRegexWrapper {
    /**
     * Initializes the RegexLib instance, loading the WebAssembly module.
     * @param {string} wasmPath - The path to the compiled WebAssembly file.
     * @returns {Promise<RegexLib>} A promise that resolves to the initialized instance.
     */
    static async initialize(wasmPath) {
        if (typeof Go === "undefined") {
            throw new Error("wasm_exec.js must be loaded before using GoRegexWrapper.");
        }

        const go = new Go();
        const wasmModule = await WebAssembly.instantiateStreaming(fetch(wasmPath), go.importObject);
        go.run(wasmModule.instance);
        GoRegexWrapper._instance = new GoRegexWrapper();
    }

    static getInstance() {
        if (!GoRegexWrapper._instance) {
            throw new Error("GoRegexWrapper has not been initialized. Call initialize() first.");
        }
        return GoRegexWrapper._instance;
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
            throw new Error(error.message);
        }
    }
}

GoRegexWrapper._instance = null;

export default GoRegexWrapper;

