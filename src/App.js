import React, { Component } from "react";

import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import Main from "./Main";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			zoom: null,
		};

		this.keys = [];

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleZoom = this.handleZoom.bind(this);
	}

	handleZoom(zoom) {
		this.setState({ zoom });
	}

	unsubscribeFromKeydownEvents() {
		document.addEventListener("keydown", this.handleKeyDown, false);
		document.addEventListener("keyup", this.handleKeyUp, false);
	}

	componentWillUnmount() {
		this.unsubscribeFromKeydownEvents();
	}

	subscribeToKeydownEvents() {
		document.addEventListener("keydown", this.handleKeyDown, false);
		document.addEventListener("keyup", this.handleKeyUp, false);
	}

	componentDidMount() {
		this.subscribeToKeydownEvents();
	}

	handleKeyDown = event => {
		console.log(event)
		// this.keys[event.keyCode] = true;

		if (event.key === " ") {
			event.preventDefault();
			this.setState({isPlaying: !this.state.isPlaying});
		}

		if (event.shiftKey && event.key === "ArrowUp") {
			// command and arrow up
			event.preventDefault();
			const zoom = this.state.zoom * 1.25;
			this.setState({ zoom });
			console.log('zooom +')
		} else if (event.shiftKey && event.key === "ArrowDown") {
			// command and arrow down
			event.preventDefault();
			const zoom = this.state.zoom / 1.25;
			this.setState({ zoom });
			console.log('zooom -')

		}
		// console.log(this.keys[91], this.keys[38], this.keys[40]);
	};

	handleKeyUp(event) {
		// event.preventDefault();
		// if (event.key === "Shift") {
		// 	this.props.setTextLabels(this.textLabels);
		// }
		// event.preventDefault();

		// this.keys[event.keyCode] = false;
		console.log(this.state.zoom);
		// event.preventDefault();
	}

	render() {
		return (
			<div className="App">
				<Main
					isPlaying={this.state.isPlaying}
					zoom={this.state.zoom}
					onZoom={this.handleZoom}
				/>
			</div>
		);
	}
}

export default App;
