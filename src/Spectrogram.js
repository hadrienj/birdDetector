import React, { Component } from "react";

import WaveSurfer from "wavesurfer.js";
import SpectrogramPlugin from "wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js";
import colormap from "colormap"

class Spectrogram extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};

		this.colors = colormap({
		    colormap: 'hot',
		    nshades: 256,
		    format: 'float'
		});

		this.wavesurfer = WaveSurfer.create({
			container: "#waveform",
			height: 100,
			pixelRatio: 2,
			scrollParent: true,
			normalize: false,
			autoCenter: false,
			barHeight: 2,
			backend: "WebAudio",
			// xhr: {
			//   requestHeaders: [
			//     {
			//       key: "Authorization",
			//       value: await getAuthHeader()
			//     }
			//   ]
			// },
			waveColor: "#2EBCE7",
			partialRender: true,
			plugins: [
				SpectrogramPlugin.create({
					wavesurfer: this.wavesurfer,
					container: "#spectrogram",
					pixelRatio: 2,
					colorMap: this.colors,
				})
			]
		});

		try {
			this.wavesurfer.load(this.props.audioPath);
		} catch (err) {
			console.log("err", err);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isPlaying !== this.props.isPlaying) {
			this.wavesurfer.playPause();
		}
		if (prevProps.isLoaded !== this.props.isLoaded) {

			// Remove previous wave
			const waveformElement = document.getElementById('waveform')
			waveformElement.removeChild(waveformElement.firstChild);

			this.wavesurfer = WaveSurfer.create({
				container: "#waveform",
				height: 100,
				pixelRatio: 2,
				scrollParent: true,
				normalize: false,
				autoCenter: false,
				barHeight: 2,
				backend: "WebAudio",
				// xhr: {
				//   requestHeaders: [
				//     {
				//       key: "Authorization",
				//       value: await getAuthHeader()
				//     }
				//   ]
				// },
				waveColor: "#2EBCE7",
				partialRender: true,
				plugins: [
					SpectrogramPlugin.create({
						wavesurfer: this.wavesurfer,
						container: "#spectrogram",
						pixelRatio: 2,
						colorMap: this.colors,
					})
				]
			});
			try {
				this.wavesurfer.load(this.props.audioPath);
				this.props.onFileLoaded(false);
			} catch (err) {
				console.log("err", err);
			}
		}
	}

	render() {
		// wavesurfer.zoom(200);

		// wavesurfer.on("ready", () => {
		//   this.setState({ loading: false });
		// });

		// wavesurfer.on("error", (err) => {
		//   this.setState({ loading: false });
		//   console.log("err", err);
		// });

		return <div>asdf</div>;
	}
}

export default Spectrogram;
