import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.props.onGetFilename(this.state.filename);
    this.fileUpload(this.state.file);
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  fileUpload(file) {
    console.log(process.env.REACT_APP_BACKEND_URL, file);
    const url = process.env.REACT_APP_BACKEND_URL;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "audio/wav"
      }
    };

    formData.onload = function(evt) {
      // Create a Blob providing as first argument a typed array with the file buffer
      var blob = new window.Blob([new Uint8Array(evt.target.result)]);
      this.props.onGetAudioBlob(blob);

      // Load the blob into Wavesurfer
      // wavesurfer.loadBlob(blob);
    };

    return axios.post(url, formData, config).then(response => {
      console.log(response);
      this.props.onGetData(response.data);
      this.props.onFileLoaded(true);
      return response;
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default SimpleReactFileUpload;
