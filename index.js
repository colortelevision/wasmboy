import './style';
import { Component } from 'preact';
import { WasmBoy, WasmBoyGraphics, WasmBoyAudio, WasmBoyController, WasmBoyMemory } from './lib/wasmboy.js';
import { WasmBoyDebugger, WasmBoySystemControls, WasmBoyOptions } from './debugger/index';

// Old Perf Options
// WasmBoy.initialize(canvasElement, {
// 	frameSkip: 1,
// 	audioBatchProcessing: true,
// 	timersBatchProcessing: true,
// 	audioAccumulateSamples: true,
// 	graphicsDisableScanlineRendering: true
// });

//const defaultGamePath = './test/accuracy/testroms/blargg/cpu_instrs.gb';
const defaultGamePath = './games/linksawakening.gb';

const wasmBoyDefaultOptions = {
	isGbcEnabled: true,
	isAudioEnabled: true,
	frameSkip: 1,
	audioBatchProcessing: true,
	timersBatchProcessing: false,
	audioAccumulateSamples: true,
	graphicsBatchProcessing: false,
	graphicsDisableScanlineRendering: false,
	tileRendering: true,
	tileCaching: true,
	gameboySpeed: 1.0,
	saveStateCallback: (saveStateObject) => {
		// Function called everytime a savestate occurs
		// Used by the WasmBoySystemControls to show screenshots on save states
		saveStateObject.screenshotCanvasDataURL = WasmBoyGraphics.canvasElement.toDataURL();
		return saveStateObject;
	}
};

// Our canvas element
let canvasElement = undefined;

export default class App extends Component {

	constructor() {
		super();

		this.state = {
			showDebugger: false,
			showOptions: false
		}
	}

	// Using componentDidMount to wait for the canvas element to be inserted in DOM
	componentDidMount() {
		// Get our canvas element
		canvasElement = document.querySelector(".wasmboy__canvas-container__canvas");

		// Load our game
		WasmBoy.initialize(canvasElement, wasmBoyDefaultOptions);

		// Add our touch inputs
		// Add our touch inputs
		const dpadElement = document.getElementById('gamepadDpad');
		const startElement = document.getElementById('gamepadStart');
		const selectElement = document.getElementById('gamepadSelect');
		const aElement = document.getElementById('gamepadA');
		const bElement = document.getElementById('gamepadB');

		WasmBoyController.addTouchInput('UP', dpadElement, 'DPAD', 'UP');
		WasmBoyController.addTouchInput('RIGHT', dpadElement, 'DPAD', 'RIGHT');
		WasmBoyController.addTouchInput('DOWN', dpadElement, 'DPAD', 'DOWN');
		WasmBoyController.addTouchInput('LEFT', dpadElement, 'DPAD', 'LEFT');
		WasmBoyController.addTouchInput('A', aElement, 'BUTTON');
		WasmBoyController.addTouchInput('B', bElement, 'BUTTON');
		WasmBoyController.addTouchInput('START', startElement, 'BUTTON');
		WasmBoyController.addTouchInput('SELECT', selectElement, 'BUTTON');

		//WasmBoy.loadGame('./test/testroms/blargg/cpu_instrs.gb')
		WasmBoy.loadGame(defaultGamePath)
		.then(() => {
			console.log('Wasmboy Ready!');
		}).catch((error) => {
			console.log('Load Game Error:', error);
		});
	}

	render() {

		// Optionally render the options
		let optionsComponent = (
			<div></div>
		)
		if (this.state.showOptions) {
			optionsComponent = (
				<div className={ "wasmboy__options" }>
					<WasmBoyOptions wasmBoy={WasmBoy} defaultOptions={wasmBoyDefaultOptions}></WasmBoyOptions>
				</div>
			)
		}

		// optionally render the debugger
		let debuggerComponent = (
			<div></div>
		)
		if (this.state.showDebugger) {
			debuggerComponent = (
				<div className={ "wasmboy__debugger" }>
					<WasmBoyDebugger wasmboy={WasmBoy} wasmboyGraphics={WasmBoyGraphics} wasmboyAudio={WasmBoyAudio}></WasmBoyDebugger>
				</div>
			)
		}

		return (
			<div>
				<h1>WasmBoy Demo</h1>
				<div style="text-align: center">
          <label for="showOptions">Show Options</label>
          <input
            id="showOptions"
            type="checkbox"
            checked={ this.state.showOptions }
            onChange={ () => {
								const newState = Object.assign({}, this.state);
								newState.showOptions = !newState.showOptions;
								this.setState(newState);
							}
						} />
        </div>

				{optionsComponent}

				<div style="text-align: center">
          <label for="showDebugger">Show Debugger</label>
          <input
            id="showDebugger"
            type="checkbox"
            checked={ this.state.showDebugger }
            onChange={ () => {
								const newState = Object.assign({}, this.state);
								newState.showDebugger = !newState.showDebugger;
								this.setState(newState);
							}
						} />
        </div>

				{debuggerComponent}

				<div class="wasmboy__systemControls">
					<WasmBoySystemControls wasmboy={WasmBoy} wasmboyMemory={WasmBoyMemory}></WasmBoySystemControls>
				</div>
				<div className="wasmboy__canvas-container">
    			<canvas className="wasmboy__canvas-container__canvas">
          </canvas>
        </div>

				<div class="wasmboy__gamepad">

					{/* DPAD */}
					<svg id="gamepadDpad" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M0 0h24v24H0z" fill="none"/>
					    <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
					</svg>

					{/* Start */}
					<svg id="gamepadStart" height="24" viewBox="6 6 12 12" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M19 13H5v-2h14v2z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
							<text x="21" y="55" transform="scale(0.325)">Start</text>
					</svg>

					{/* Select */}
					<svg id="gamepadSelect" height="24" viewBox="6 6 12 12" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M19 13H5v-2h14v2z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
							<text x="16" y="55" transform="scale(0.325)">Select</text>
					</svg>

					{/* A */}
					<svg id="gamepadA" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
							<text x="7.5" y="16.25">A</text>
					</svg>

					{/* B */}
					<svg id="gamepadB" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
							<text x="7.5" y="17.25">B</text>
					</svg>
				</div>

			</div>
		);
	}
}
