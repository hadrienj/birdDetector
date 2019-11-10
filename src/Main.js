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
    };
    this.handleData = this.handleData.bind(this);
    this.handleFilename = this.handleFilename.bind(this);
    this.handleFileLoaded = this.handleFileLoaded.bind(this);
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

  render() {
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
      elements = (
        <div>
          <SimpleReactFileUpload
            onGetData={this.handleData}
            onGetFilename={this.handleFilename}
            onFileLoaded={this.handleFileLoaded}
          />
          <Spectrogram
            audioPath={`https://fierce-escarpment-27870.herokuapp.com/static/${this.state.filename}`}
            isPlaying={this.props.isPlaying}
            isLoaded={this.state.isLoaded}
            onFileLoaded={this.handleFileLoaded}
          />
          <PredPlot data={this.state.data} />
        </div>
      );
    } else {
      elements = (
        <div>
          <SimpleReactFileUpload
            onGetData={this.handleData}
            onGetFilename={this.handleFilename}
          />
          <PredPlot data={this.state.data} />
        </div>
      );
    }
    return elements;
  }
}

export default Main;
