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
	}

	createWavesurfer() {
		this.wavesurfer = WaveSurfer.create({
			container: "#waveform",
			height: 100,
			pixelRatio: 2,
			scrollParent: true,
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

		this.wavesurfer.zoom(Number(this.props.zoom));
	}




	componentDidUpdate(prevProps) {
		console.log('update')
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
	}

	render() {
		console.log('render', this.props.zoom);
		this.createWavesurfer();


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
