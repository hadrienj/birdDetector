import React, { Component } from "react";

import Plot from "react-plotly.js";

class PredPlot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Plot
        data={[
          {
            y: this.props.data,
            type: "scatter",
            mode: "lines",
            marker: { color: "#2EBCE7" },
            rangemode: "nonnegative",
          }
        ]}
        layout={{
          xaxis: {
            range: [0, this.props.data.length],
            showgrid: false,
          },
          yaxis: {
            range: [0, 1],
            showgrid: false,
          },
          width: window.innerWidth,
          height: 200,
          autosize: false,
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
          },
        }}
        divId="spectrogram"
      />
    );
  }
}

export default PredPlot;
