import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import backend from '../api/backend';
import '../css/App.css';



class App extends Component {

  async get_statuses() {
    const response = await backend.get('/stats/');
    console.log(response);
  }

  async get_stat(stat) {
    const response = await backend.get('/stats/'+stat);
    console.log(response);
  }


  render() {
    return (
      <div className="App">
        <button onClick={this.get_statuses}>
          GET ALL STATUSES (Check console)
        </button>
        <button onClick={() => this.get_stat('age')}>
          GET AGE (Check console)
        </button>
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
      </div>
    );
  }
}

export default App;
