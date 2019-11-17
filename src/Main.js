import React, { Component } from "react";
import ReactLoading from "react-loading";
import { Switch, Route } from "react-router-dom";

import PredPlot from "./PredPlot";
import Spectrogram from "./Spectrogram";

import SimpleReactFileUpload from "./SimpleReactFileUpload";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      filename: `bird1.wav`,
      isLoaded: false,
      audioBlob: null,
      width: null,
      zoom: null,
    };
    this.handleData = this.handleData.bind(this);
    this.handleFilename = this.handleFilename.bind(this);
    this.handleFileLoaded = this.handleFileLoaded.bind(this);
    this.handleWidth = this.handleWidth.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
  }

  handleData(data) {
    this.setState({ data });
  }

  handleFilename(filename) {
    this.setState({ filename });
  }

  handleFileLoaded(isLoaded) {
    this.setState({ isLoaded });
  }

  handleAudioBlob(audioBlob) {
    this.setState({ audioBlob });
  }

  handleWidth(width) {
    this.setState({ width });
  }

  handleZoom(zoom) {
    console.log('asdfasdfasdf', zoom)
    this.setState({ zoom });
    this.props.onZoom(zoom);
  }

  render() {
    console.log(`=================== ${process.env.REACT_APP_BACKEND_URL}`)
    let elements;
    if (this.state.loading) {
      elements = (
        <div className="loading">
          <ReactLoading type="spin" color="#2eaa26" height={30} width={30} />
        </div>
      );
      // elements = (
      //   <div>Loading1...</div>
      // )
    } else {
      elements = (
        <div> asdf </div>
        // <PredPlot />
      );
    }
    if (this.state.filename) {
      console.log(this.state.filename)
      elements = (
        <div>
          <SimpleReactFileUpload
            onGetData={this.handleData}
            onGetFilename={this.handleFilename}
            onGetAudioBlob={this.handleAudioBlob}
            onFileLoaded={this.handleFileLoaded}
          />
          <Spectrogram
            audioPath={`${process.env.REACT_APP_BACKEND_URL}/static/${this.state.filename}`}
            isPlaying={this.props.isPlaying}
            isLoaded={this.state.isLoaded}
            onFileLoaded={this.handleFileLoaded}
            audioBlob={this.state.audioBlob}
            zoom={this.props.zoom}
            onZoom={this.handleZoom}
            onWidth={this.handleWidth}
          />
          <PredPlot
            data={this.state.data}
            width={this.state.width}
          />
        </div>
      );
    } else {
      elements = (
        <div>
          <SimpleReactFileUpload
            onGetData={this.handleData}
            onGetFilename={this.handleFilename}
            onGetAudioBlob={this.handleAudioBlob}
            onFileLoaded={this.handleFileLoaded}
          />
          <Spectrogram
            audioPath={`${process.env.REACT_APP_BACKEND_URL}/static/${this.state.filename}`}
            isPlaying={this.props.isPlaying}
            isLoaded={this.state.isLoaded}
            onFileLoaded={this.handleFileLoaded}
            audioBlob={this.state.audioBlob}
            zoom={this.props.zoom}
            onZoom={this.handleZoom}
            onWidth={this.handleWidth}
          />
          <PredPlot data={this.state.data} />
        </div>
      );
    }
    return elements;
  }
}

export default Main;
