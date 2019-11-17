import React, { Component } from "react";

import WaveSurfer from "wavesurfer.js";
import SpectrogramPlugin from "wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js";
import colormap from "colormap";

class Spectrogram extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
		};


		this.colors = colormap({
			colormap: "hot",
			nshades: 256,
			format: "float"
		});

		this.createWavesurfer();

		this.wavesurfer.on("ready", () => {
			// store zoom value
			const dur = this.wavesurfer.getDuration();
			const zoom = window.innerWidth / dur;
			console.log('ffdf', dur, window.innerWidth)
			this.props.onZoom(zoom);
		});
	}

	createWavesurfer() {
		this.wavesurfer = WaveSurfer.create({
			container: "#waveform",
			height: 100,
			pixelRatio: 2,
			scrollParent: false,
			normalize: false,
			autoCenter: false,
			// barHeight: 2,
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
			// partialRender: true,
			plugins: [
				SpectrogramPlugin.create({
					wavesurfer: this.wavesurfer,
					container: "#wave-spectrogram",
					pixelRatio: 2,
					colorMap: this.colors
				})
			]
		});

		try {
			if (this.props.audioBlob !== null) {
				console.log("fdfdf", this.props.audioBlob);
				this.wavesurfer.loadBlob(this.props.audioBlob);
			} else {
				console.log("this.props.audioPath", this.props.audioPath);
				this.wavesurfer.load(this.props.audioPath);
			}
		} catch (err) {
			console.log("err", err);
		}

		// this.wavesurfer.zoom(Number(this.props.zoom));
	}




	componentDidUpdate(prevProps) {
		console.log('update', prevProps);
		if (prevProps.isPlaying !== this.props.isPlaying) {
			this.wavesurfer.playPause();
		}
		if (prevProps.isLoaded !== this.props.isLoaded) {
			console.log('remove div')

			// Remove previous wave
			const waveformElement = document.getElementById("waveform");
			waveformElement.removeChild(waveformElement.firstChild);
			this.createWavesurfer();
		}
		if (prevProps.zoom !== this.props.zoom) {
			// // Remove previous wave
			// const waveformElement = document.getElementById("waveform");
			// waveformElement.removeChild(waveformElement.firstChild);
			// this.createWavesurfer();
			this.wavesurfer.zoom(Number(this.props.zoom));

			const dur = this.wavesurfer.getDuration();
			console.log({dur});

			const width = this.props.zoom * dur;

			// change width spectrogram
			const nodeSpectrogram = document.getElementById("wave-spectrogram").childNodes[0].childNodes[0];
			nodeSpectrogram.style.width = `${width}px`;
			nodeSpectrogram.style.height = "100px";

			// change width spectrogram container
			const nodeSpectrogramContainer = document.getElementById("wave-spectrogram");
			nodeSpectrogramContainer.style.width = `${width}px`;
			nodeSpectrogramContainer.style.height = "100px";

			// change width waveform
			const nodeWaveform = document.getElementById("waveform");
			nodeWaveform.style.width = `${width}px`;
			nodeWaveform.style.height = "100px";

			this.props.onWidth(width);
		}
	}

	render() {
		console.log('render', this.props.zoom);

		// wavesurfer.on("error", (err) => {
		//   this.setState({ loading: false });
		//   console.log("err", err);
		// });

		return <div>asdf</div>;
	}
}

export default Spectrogram;
