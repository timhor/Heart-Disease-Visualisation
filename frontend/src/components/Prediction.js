import React, { Component } from 'react';
import backend from '../api/backend';
import Header from './Header';
import {
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography
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
};

class Prediction extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async getPrediction() {
    const queryString = Object.entries(this.state)
      .map(entry => entry.join('='))
      .join('&');
    const response = await backend.get('/prediction?' + queryString);
    this.setState({ prediction: response.data.target });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  printState = () => {
    console.log(this.state);
  };

  resetState = () => {
    this.setState({ ...initialState, prediction: undefined });
  };

  // no heart disease
  prefillSample1 = () => {
    this.setState({
      age: '63',
      sex: '1',
      cp: '1',
      trestbps: '145.0',
      chol: '233.0',
      fbs: '1',
      restecg: '2',
      thalach: '150.0',
      exang: '0',
      oldpeak: '2.3',
      slope: '3',
      ca: '0',
      thal: '6'
    });
  };

  // heart disease
  prefillSample2 = () => {
    this.setState({
      age: '67',
      sex: '1',
      cp: '4',
      trestbps: '160.0',
      chol: '286.0',
      fbs: '0',
      restecg: '2',
      thalach: '108.0',
      exang: '1',
      oldpeak: '1.5',
      slope: '2',
      ca: '3',
      thal: '3'
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="prediction-form">
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
                <MenuItem value={'0'}>Female</MenuItem>
                <MenuItem value={'1'}>Male</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="cp">Chest pain type</InputLabel>
              <Select
                name="cp"
                value={this.state.cp}
                onChange={this.handleChange('cp')}
              >
                <MenuItem value={'1'}>Typical anigma</MenuItem>
                <MenuItem value={'2'}>Atypical angina</MenuItem>
                <MenuItem value={'3'}>Non-anginal pain</MenuItem>
                <MenuItem value={'4'}>Asymptomatic</MenuItem>
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
                <MenuItem value={'0'}>&le; 120mg/dl</MenuItem>
                <MenuItem value={'1'}>&gt; 120mg/dl</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="restecg">Resting ECG</InputLabel>
              <Select
                name="restecg"
                value={this.state.restecg}
                onChange={this.handleChange('restecg')}
              >
                <MenuItem value={'0'}>Normal</MenuItem>
                <MenuItem value={'1'}>ST-T wave abnormality</MenuItem>
                <MenuItem value={'2'}>Left ventricular hypertrophy</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="number"
              label="Maximum heart rate achieved"
              value={this.state.thalach}
              onChange={this.handleChange('thalach')}
            />

            <FormControl>
              <InputLabel htmlFor="exang">
                Exercise-induced angina
              </InputLabel>
              <Select
                name="exang"
                value={this.state.exang}
                onChange={this.handleChange('exang')}
              >
                <MenuItem value={'0'}>No</MenuItem>
                <MenuItem value={'1'}>Yes</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="number"
              label="ST depression"
              value={this.state.oldpeak}
              onChange={this.handleChange('oldpeak')}
            />

            <FormControl>
              <InputLabel htmlFor="slope">
                Slope of peak exercise ST segment
              </InputLabel>
              <Select
                name="slope"
                value={this.state.slope}
                onChange={this.handleChange('slope')}
              >
                <MenuItem value={'1'}>Up</MenuItem>
                <MenuItem value={'2'}>Flat</MenuItem>
                <MenuItem value={'3'}>Down</MenuItem>
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
                <MenuItem value={'3'}>Normal</MenuItem>
                <MenuItem value={'6'}>Fixed defect</MenuItem>
                <MenuItem value={'7'}>Reversable defect</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="form-button-wrapper">
            <Button
              variant="contained"
              color="default"
              className="Button"
              onClick={this.prefillSample1}
            >
              Pre-fill Sample 1
            </Button>
            <Button
              variant="contained"
              color="default"
              className="Button"
              onClick={this.prefillSample2}
            >
              Pre-fill Sample 2
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="Button"
              onClick={() => this.getPrediction()}
              // need to call the function here to handle 'this' binding
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

          {this.state.prediction !== undefined && (
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Prediction:{' '}
                  {this.state.prediction === 0
                    ? 'No Heart Disease'
                    : 'Heart Disease'}
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

export default Prediction;
