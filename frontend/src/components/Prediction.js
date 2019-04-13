import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  Typography,
  withStyles
} from '@material-ui/core';
import '../css/App.css';
import '../css/Prediction.css';

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

const styles = {
  button: {
    margin: '10px 10px !important'
  },
  formField: {
    margin: '10px'
  },
  result: {
    margin: '6px',
    textAlign: 'center'
  }
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
      trestbps: '145',
      chol: '233',
      fbs: '1',
      restecg: '2',
      thalach: '150',
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
      trestbps: '160',
      chol: '286',
      fbs: '0',
      restecg: '2',
      thalach: '108',
      exang: '1',
      oldpeak: '1.5',
      slope: '2',
      ca: '3',
      thal: '3'
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Header />
        <div className="container">
          <div className="parameter-wrapper">
            <TextField
              type="number"
              label="Age"
              value={this.state.age}
              onChange={this.handleChange('age')}
              classes={{ root: classes.formField }}
            />

            <FormControl classes={{ root: classes.formField }}>
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

            <FormControl classes={{ root: classes.formField }}>
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
              classes={{ root: classes.formField }}
            />

            <TextField
              type="number"
              label="Serum cholesterol in mg/dl"
              value={this.state.chol}
              onChange={this.handleChange('chol')}
              classes={{ root: classes.formField }}
            />

            <FormControl classes={{ root: classes.formField }}>
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

            <FormControl classes={{ root: classes.formField }}>
              <InputLabel htmlFor="restecg">Resting ECG</InputLabel>
              <Select
                name="restecg"
                value={this.state.restecg}
                onChange={this.handleChange('restecg')}
              >
                <MenuItem value={'0'}>Normal</MenuItem>
                <MenuItem value={'1'}>ST-T wave abnormality</MenuItem>
                <MenuItem value={'2'}>
                  Left ventricular hypertrophy
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="number"
              label="Maximum heart rate achieved"
              value={this.state.thalach}
              onChange={this.handleChange('thalach')}
              classes={{ root: classes.formField }}
            />

            <FormControl classes={{ root: classes.formField }}>
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
              classes={{ root: classes.formField }}
            />

            <FormControl classes={{ root: classes.formField }}>
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
              classes={{ root: classes.formField }}
            />

            <FormControl classes={{ root: classes.formField }}>
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
            <div>
              <Button
                variant="contained"
                color="default"
                onClick={this.prefillSample1}
                classes={{ root: classes.button }}
              >
                Pre-fill Sample 1
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={this.prefillSample2}
                classes={{ root: classes.button }}
              >
                Pre-fill Sample 2
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                disabled={Object.values(this.state).some(value => value === '')}
                onClick={() => this.getPrediction()}
                classes={{ root: classes.button }}
                // need to call the function here to handle 'this' binding
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={Object.values(this.state).every(value => value === '' || value === undefined)}
                onClick={this.resetState}
                classes={{ root: classes.button }}
              >
                Reset
              </Button>
            </div>
          </div>

          {this.state.prediction !== undefined && (
            <Card>
              <CardContent>
                <Typography classes={{ root: classes.result }} variant="h5">
                  Prediction:&nbsp;
                  <span className={this.state.prediction === 0
                    ? 'negativeResult'
                    : 'positiveResult'}>
                    {this.state.prediction === 0
                      ? 'No Heart Disease'
                      : 'Heart Disease'}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      </>
    );
  }
}

Prediction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Prediction);
