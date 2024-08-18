// IMPORTS
// import wasmBinary from "./wasmBinary.wasm";
import "./wasm_exec.js";

const go = new Go(); // Defined in wasm_exec.js
const WASM_URL = 'wasm.wasm';

var wasm;

if ('instantiateStreaming' in WebAssembly) {
	console.log(WASM_URL)
	WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
		wasm = obj.instance;
		go.run(wasm);
	})
} else {
	fetch(WASM_URL).then(resp =>
		resp.arrayBuffer()
	).then(bytes =>
		WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
			wasm = obj.instance;
			go.run(wasm);
		})
	)
}