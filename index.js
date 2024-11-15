import './wasm_exec.js';
import GoRegexWrapper from './goRegexWrapper.js';

let GolangRegex;

(async () => {
    const wasmPath = './goregex.wasm';
    await GoRegexWrapper.initialize(wasmPath);
    GolangRegex = GoRegexWrapper.getInstance();
})();

export default GolangRegex;
