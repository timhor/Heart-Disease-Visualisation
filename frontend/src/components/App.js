import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
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

  async getPrediction() {
    const queryString = Object.entries(this.state)
      .map(entry => entry.join('='))
      .join('&');
    const response = await backend.get('/stats/prediction?' + queryString);
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
        <Link to="/plot">
            Sample Plot
        </Link>

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
              <MenuItem value={0}>Female</MenuItem>
              <MenuItem value={1}>Male</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="cp">Chest pain type</InputLabel>
            <Select
              name="cp"
              value={this.state.cp}
              onChange={this.handleChange('cp')}
            >
              <MenuItem value={1}>Typical anigma</MenuItem>
              <MenuItem value={2}>Atypical angina</MenuItem>
              <MenuItem value={3}>Non-anginal pain</MenuItem>
              <MenuItem value={4}>Asymptomatic</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Resting blood pressure"
            value={this.state.trestbps}
            onChange={this.handleChange('trestbps')}
          />

          <TextField
            type="number"
            label="Serum cholesterol in mg/dl"
            value={this.state.chol}
            onChange={this.handleChange('chol')}
          />

          <FormControl>
            <InputLabel htmlFor="fbs">Fasting blood sugar</InputLabel>
            <Select
              name="fbs"
              value={this.state.fbs}
              onChange={this.handleChange('fbs')}
            >
              <MenuItem value={0}>&le; 120mg/dl</MenuItem>
              <MenuItem value={1}>&gt; 120mg/dl</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="restecg">Resting ECG</InputLabel>
            <Select
              name="restecg"
              value={this.state.restecg}
              onChange={this.handleChange('restecg')}
            >
              <MenuItem value={0}>Normal</MenuItem>
              <MenuItem value={1}>ST-T wave abnormality</MenuItem>
              <MenuItem value={2}>Left ventricular hypertrophy</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Maximum heart rate achieved"
            value={this.state.thalach}
            onChange={this.handleChange('thalach')}
          />

          <FormControl>
            <InputLabel htmlFor="exang">Exercise-induced angina</InputLabel>
            <Select
              name="exang"
              value={this.state.exang}
              onChange={this.handleChange('exang')}
            >
              <MenuItem value={0}>No</MenuItem>
              <MenuItem value={1}>Yes</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="ST depression"
            value={this.state.oldpeak}
            onChange={this.handleChange('oldpeak')}
          />

          <FormControl>
            <InputLabel htmlFor="slope">Slope of peak exercise ST segment</InputLabel>
            <Select
              name="slope"
              value={this.state.slope}
              onChange={this.handleChange('slope')}
            >
              <MenuItem value={1}>Up</MenuItem>
              <MenuItem value={2}>Flat</MenuItem>
              <MenuItem value={3}>Down</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Major vessels coloured by flourosopy"
            value={this.state.ca}
            onChange={this.handleChange('ca')}
          />

          <FormControl>
            <InputLabel htmlFor="thal">Thalassemia</InputLabel>
            <Select
              name="thal"
              value={this.state.thal}
              onChange={this.handleChange('thal')}
            >
              <MenuItem value={3}>Normal</MenuItem>
              <MenuItem value={6}>Fixed defect</MenuItem>
              <MenuItem value={7}>Reversable defect</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button
          variant="contained"
          color="primary"
          className="Button"
          onClick={() => this.getPrediction()}
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
      </div>
    );
  }
}

class PlotDemo extends Component {
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
    );
  }
}

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            <Redirect to="/prediction" />
          )} />
          <Route path="/prediction" component={App} />
          <Route path="/plot" component={PlotDemo} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;
