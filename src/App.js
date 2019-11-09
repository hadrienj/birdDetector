import React, { Component } from "react";

import "./App.css";

import Main from "./Main";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false
		};
		this.handleKeyDown = this.handleKeyDown.bind(this);
		document.addEventListener("keydown", this.handleKeyDown, false);
	}

	handleKeyDown(event) {
		if (event.key === " ") {
			event.preventDefault();
			this.setState({isPlaying: !this.state.isPlaying});
		}
	}

	render() {
		return (
			<div className="App">
				<Main isPlaying={this.state.isPlaying} />
			</div>
		);
	}
}

export default App;
