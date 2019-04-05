import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import backend from '../api/backend';
import {
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import '../css/App.css';

const initialState = {
  age: '',
  sex: '',
  cp: '',
  trestbps: '',
  chol: '',
  fbs: '',
  restecg: '',
  thalach: '',
  exang: '',
  oldpeak: '',
  slope: '',
  ca: '',
  thal: ''
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async getStatuses() {
    const response = await backend.get('/stats/');
    console.log(response);
  }

  async getStat(stat) {
    const response = await backend.get('/stats/' + stat);
    console.log(response);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  printState = () => {
    console.log(this.state);
  }

  resetState = () => {
    this.setState(initialState);
  }

  render() {
    return (
      <div className="App">
        <Button
          variant="contained"
          color="default"
          className="Button"
          onClick={this.getStatuses}
        >
          GET ALL STATUSES (check console)
        </Button>
        <Button
          variant="contained"
          color="default"
          className="Button"
          onClick={() => this.getStat('age')}
        >
          GET AGE (check console)
        </Button>

        <hr></hr>

        <div className="parameter-wrapper">
          <TextField
            type="number"
            label="Age"
            value={this.state.age}
            onChange={this.handleChange('age')}
          />

          <FormControl>
            <InputLabel htmlFor="sex">Sex</InputLabel>
            <Select
              name="sex"
              value={this.state.sex}
              onChange={this.handleChange('sex')}
            >
              <MenuItem value={0}>M</MenuItem>
              <MenuItem value={1}>F</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="cp">Cp</InputLabel>
            <Select
              name="cp"
              value={this.state.cp}
              onChange={this.handleChange('cp')}
            >
              <MenuItem value={1}>typical anigma</MenuItem>
              <MenuItem value={2}>atypical angina</MenuItem>
              <MenuItem value={3}>non-anginal pain</MenuItem>
              <MenuItem value={4}>asymptomatic</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Trestbps"
            value={this.state.trestbps}
            onChange={this.handleChange('trestbps')}
          />
          <TextField
            type="number"
            label="Chol"
            value={this.state.chol}
            onChange={this.handleChange('chol')}
          />

          <FormControl>
            <InputLabel htmlFor="fbs">Fbs</InputLabel>
            <Select
              name="fbs"
              value={this.state.fbs}
              onChange={this.handleChange('fbs')}
            >
              <MenuItem value={0}>&lt; 120mg/ml</MenuItem>
              <MenuItem value={1}>&gt; 120mg/ml</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="restecg">Restecg</InputLabel>
            <Select
              name="restecg"
              value={this.state.restecg}
              onChange={this.handleChange('restecg')}
            >
              <MenuItem value={0}>normal</MenuItem>
              <MenuItem value={1}>ST-T wave abnormality</MenuItem>
              <MenuItem value={2}>left ventricular hypertrophy</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Thalach"
            value={this.state.thalach}
            onChange={this.handleChange('thalach')}
          />

          <FormControl>
            <InputLabel htmlFor="exang">Exang</InputLabel>
            <Select
              name="exang"
              value={this.state.exang}
              onChange={this.handleChange('exang')}
            >
              <MenuItem value={0}>no</MenuItem>
              <MenuItem value={1}>yes</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Oldpeak"
            value={this.state.oldpeak}
            onChange={this.handleChange('oldpeak')}
          />

          <FormControl>
            <InputLabel htmlFor="slope">Slope</InputLabel>
            <Select
              name="slope"
              value={this.state.slope}
              onChange={this.handleChange('slope')}
            >
              <MenuItem value={1}>up</MenuItem>
              <MenuItem value={2}>flat</MenuItem>
              <MenuItem value={3}>down</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Ca"
            value={this.state.ca}
            onChange={this.handleChange('ca')}
          />

          <FormControl>
            <InputLabel htmlFor="thal">Thal</InputLabel>
            <Select
              name="thal"
              value={this.state.thal}
              onChange={this.handleChange('thal')}
            >
              <MenuItem value={3}>normal</MenuItem>
              <MenuItem value={6}>fixed defect</MenuItem>
              <MenuItem value={7}>reversable defect</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button
          variant="contained"
          color="primary"
          className="Button"
          onClick={this.printState}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="Button"
          onClick={this.resetState}
        >
          Reset
        </Button>

        <hr></hr>

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
              x: [1, 2, 3],
              y: [2, 5, 3]
            }
          ]}
          layout={{
            title: 'Sample Plot',
            width: 800,
            height: 500
          }}
        />
      </div>
    );
  }
}

export default App;
