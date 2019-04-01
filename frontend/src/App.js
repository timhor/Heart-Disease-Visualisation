import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Plot from 'react-plotly.js';

class App extends Component {
  render() {
    return (
      <Plot
        data={[
          {
            name: 'line chart',
            type: 'scatter',
            x: [1, 2, 3],
            y: [2, 6, 3],
            mode: 'lines+points',
            marker: { color: 'red' }
          },
          {
            name: 'bar chart',
            type: 'bar',
            x: [1, 2, 3], y: [2, 5, 3]
          }
        ]}
        layout={
          {
            title: 'Sample Plot',
            width: 800,
            height: 500
          }
        }
      />
    );
  }
}

export default App;
