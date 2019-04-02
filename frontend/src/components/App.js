import React, { Component } from 'react';
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
        Hello world
        <button onClick={this.get_statuses}>
          GET ALL STATUSES (Check console)
        </button>
        <button onClick={() => this.get_stat('age')}>
          GET AGE (Check console)
        </button>
      </div>
    );
  }
}

export default App;
