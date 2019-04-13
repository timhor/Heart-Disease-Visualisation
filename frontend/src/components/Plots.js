import React, { Component } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import backend from '../api/backend';
import Header from './Header';
import '../css/Plots.css';

const initialState = {
  stats: {
    age: [],
    sex: [],
    cp: [],
    trestbps: [],
    chol: [],
    fbs: [],
    restecg: [],
    thalach: [],
    exang: [],
    oldpeak: [],
    slope: [],
    ca: [],
    thal: [],
    target: []
  },
  corr: [],
  corrCol: []
};

// request cancellation adapted from https://github.com/axios/axios#cancellation
const CancelToken = axios.CancelToken;
let cancelGetStats;
let cancelGetStat;

class Plots extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async getStats() {
    const response = await backend
      .get('/stats/', {
        cancelToken: new CancelToken(c => {
          cancelGetStats = c;
        })
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request cancelled: getStats');
        } else {
          console.log('Request errored: getStats');
        }
      });

    if (response === undefined || response.status !== 200) {
      console.log('Request failed: getStats');
      return;
    }

    const stats = this.state.stats;
    for (let property in stats) {
      stats[property] = [];
    }
    for (let i = 0; i < response.data.length; i++) {
      for (let property in response.data[i]) {
        stats[property].push(response.data[i][property]);
      }
    }
    this.setState({ stats: stats });
  }

  async getStat(stat) {
    const response = await backend
      .get('/stats/' + stat, {
        cancelToken: new CancelToken(c => {
          cancelGetStat = c;
        })
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request cancelled: getStat');
        } else {
          console.log('Request errored: getStat');
        }
      });

    if (response === undefined || response.status !== 200) {
      console.log('Request failed: getStat');
      return;
    }

    if (stat === 'corr') {
      this.setState({
        corr: response.data.data,
        corrCol: response.data.columns
      });
    }
  }

  componentDidMount() {
    this.getStats();
    this.getStat('corr');
  }

  componentWillUnmount() {
    cancelGetStats();
    cancelGetStat();
  }

  render() {
    return (
      <>
        <Header />
        <div className="plots">
          <Plot
            data={[
              {
                name: 'Males vs CP',
                type: 'bar',
                x: [
                  'typical angina',
                  'asymptomatic',
                  'non-anginal pain',
                  'atypical angina'
                ],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.cp[index] === 'typical angina'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.cp[index] === 'asymptomatic'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.cp[index] === 'non-anginal pain'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.cp[index] === 'atypical angina'
                  ).length
                ],
                marker: {
                  color: 'rgba(100, 200, 102, 0.7)',
                  line: {
                    color: 'rgba(100, 200, 102, 1)',
                    width: 1
                  }
                }
              },
              {
                name: 'Females vs CP',
                type: 'bar',
                x: [
                  'typical angina',
                  'asymptomatic',
                  'non-anginal pain',
                  'atypical angina'
                ],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.cp[index] === 'typical angina'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.cp[index] === 'asymptomatic'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.cp[index] === 'non-anginal pain'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.cp[index] === 'atypical angina'
                  ).length
                ],
                marker: {
                  color: 'green',
                  line: {
                    color: 'green',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Sex vs CP',
              width: 475,
              height: 500,
              xaxis: { title: 'CP' },
              yaxis: { title: 'Count' },
              barmode: 'group'
            }}
          />
          <Plot
            data={[
              {
                name: 'Males vs Exang',
                type: 'bar',
                x: ['yes', 'no'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' && this.state.stats.exang[index] === 'yes'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' && this.state.stats.exang[index] === 'no'
                  ).length
                ],
                marker: {
                  color: 'rgba(100, 200, 102, 0.7)',
                  line: {
                    color: 'rgba(100, 200, 102, 1)',
                    width: 1
                  }
                }
              },
              {
                name: 'Females vs Exang',
                type: 'bar',
                x: ['yes', 'no'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' && this.state.stats.exang[index] === 'yes'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' && this.state.stats.exang[index] === 'no'
                  ).length
                ],
                marker: {
                  color: 'green',
                  line: {
                    color: 'green',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Sex vs Exang',
              width: 475,
              height: 500,
              xaxis: { title: 'Exang' },
              yaxis: { title: 'Count' },
              barmode: 'group'
            }}
          />
          <Plot
            data={[
              {
                name: 'Males vs FBS',
                type: 'bar',
                x: ['> 120mg/dl', '<= 120mg/dl'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.fbs[index] === '> 120mg/dl'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.fbs[index] === '<= 120mg/dl'
                  ).length
                ],
                marker: {
                  color: 'rgba(100, 200, 102, 0.7)',
                  line: {
                    color: 'rgba(100, 200, 102, 1)',
                    width: 1
                  }
                }
              },
              {
                name: 'Females vs FBS',
                type: 'bar',
                x: ['> 120mg/dl', '<= 120mg/dl'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.fbs[index] === '> 120mg/dl'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.fbs[index] === '<= 120mg/dl'
                  ).length
                ],
                marker: {
                  color: 'green',
                  line: {
                    color: 'green',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Sex vs FBS',
              width: 475,
              height: 500,
              xaxis: { title: 'FBS' },
              yaxis: { title: 'Count' },
              barmode: 'group'
            }}
          />
          <Plot
            data={[
              {
                name: 'Males vs Restecg',
                type: 'bar',
                x: ['left ventricular hypertrophy', 'normal'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.restecg[index] ===
                        'left ventricular hypertrophy'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.restecg[index] === 'normal'
                  ).length
                ],
                marker: {
                  color: 'rgba(100, 200, 102, 0.7)',
                  line: {
                    color: 'rgba(100, 200, 102, 1)',
                    width: 1
                  }
                }
              },
              {
                name: 'Females vs Restecg',
                type: 'bar',
                x: ['left ventricular hypertrophy', 'normal'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.restecg[index] ===
                        'left ventricular hypertrophy'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.restecg[index] === 'normal'
                  ).length
                ],
                marker: {
                  color: 'green',
                  line: {
                    color: 'green',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Sex vs Restecg',
              width: 475,
              height: 500,
              xaxis: { title: 'Restecg' },
              yaxis: { title: 'Count' },
              barmode: 'group'
            }}
          />
          <Plot
            data={[
              {
                name: 'Males vs Slope',
                type: 'bar',
                x: ['down', 'up', 'flat'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' && this.state.stats.slope[index] === 'down'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' && this.state.stats.slope[index] === 'up'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' && this.state.stats.slope[index] === 'flat'
                  ).length
                ],
                marker: {
                  color: 'rgba(100, 200, 102, 0.7)',
                  line: {
                    color: 'rgba(100, 200, 102, 1)',
                    width: 1
                  }
                }
              },
              {
                name: 'Females vs Slope',
                type: 'bar',
                x: ['down', 'up', 'flat'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' && this.state.stats.slope[index] === 'down'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' && this.state.stats.slope[index] === 'up'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' && this.state.stats.slope[index] === 'flat'
                  ).length
                ],
                marker: {
                  color: 'green',
                  line: {
                    color: 'green',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Sex vs Slope',
              width: 475,
              height: 500,
              xaxis: { title: 'Slope' },
              yaxis: { title: 'Count' },
              barmode: 'group'
            }}
          />
          <Plot
            data={[
              {
                name: 'Males vs Thal',
                type: 'bar',
                x: ['fixed defect', 'normal', 'reversable defect'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.thal[index] === 'fixed defect'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' && this.state.stats.thal[index] === 'normal'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'M' &&
                      this.state.stats.thal[index] === 'reversable defect'
                  ).length
                ],
                marker: {
                  color: 'rgba(100, 200, 102, 0.7)',
                  line: {
                    color: 'rgba(100, 200, 102, 1)',
                    width: 1
                  }
                }
              },
              {
                name: 'Females vs Thal',
                type: 'bar',
                x: ['fixed defect', 'normal', 'reversable defect'],
                y: [
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.thal[index] === 'fixed defect'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' && this.state.stats.thal[index] === 'normal'
                  ).length,
                  this.state.stats.sex.filter(
                    (val, index) =>
                      val === 'F' &&
                      this.state.stats.thal[index] === 'reversable defect'
                  ).length
                ],
                marker: {
                  color: 'green',
                  line: {
                    color: 'green',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Sex vs Thal',
              width: 475,
              height: 500,
              xaxis: { title: 'Thal' },
              yaxis: { title: 'Count' },
              barmode: 'group'
            }}
          />
          <Plot
            data={[
              {
                name: 'scatter chart',
                mode: 'markers',
                type: 'scatter',
                x: this.state.stats.age,
                y: this.state.stats.chol,
                marker: {
                  color: 'rgba(255, 100, 102, 0.7)',
                  line: {
                    color: 'rgba(255, 100, 102, 1)',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Chol vs Age',
              width: 475,
              height: 500,
              xaxis: { title: 'Age' },
              yaxis: { title: 'Chol' }
            }}
          />
          <Plot
            data={[
              {
                name: 'scatter chart',
                mode: 'markers',
                type: 'scatter',
                x: this.state.stats.age,
                y: this.state.stats.ca,
                marker: {
                  color: 'rgba(255, 100, 102, 0.7)',
                  line: {
                    color: 'rgba(255, 100, 102, 1)',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'CA vs Age',
              width: 475,
              height: 500,
              xaxis: { title: 'Age' },
              yaxis: { title: 'CA' }
            }}
          />
          <Plot
            data={[
              {
                name: 'scatter chart',
                mode: 'markers',
                type: 'scatter',
                x: this.state.stats.age,
                y: this.state.stats.oldpeak,
                marker: {
                  color: 'rgba(255, 100, 102, 0.7)',
                  line: {
                    color: 'rgba(255, 100, 102, 1)',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Oldpeak vs Age',
              width: 475,
              height: 500,
              xaxis: { title: 'Age' },
              yaxis: { title: 'Oldpeak' }
            }}
          />
          <Plot
            data={[
              {
                name: 'scatter chart',
                mode: 'markers',
                type: 'scatter',
                x: this.state.stats.age,
                y: this.state.stats.thalach,
                marker: {
                  color: 'rgba(255, 100, 102, 0.7)',
                  line: {
                    color: 'rgba(255, 100, 102, 1)',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Thalach vs Age',
              width: 475,
              height: 500,
              xaxis: { title: 'Age' },
              yaxis: { title: 'Thalach' }
            }}
          />
          <Plot
            data={[
              {
                name: 'scatter chart',
                mode: 'markers',
                type: 'scatter',
                x: this.state.stats.age,
                y: this.state.stats.trestbps,
                marker: {
                  color: 'rgba(255, 100, 102, 0.7)',
                  line: {
                    color: 'rgba(255, 100, 102, 1)',
                    width: 1
                  }
                }
              }
            ]}
            layout={{
              title: 'Trestbps vs Age',
              width: 475,
              height: 500,
              xaxis: { title: 'Age' },
              yaxis: { title: 'Trestbps' }
            }}
          />
          <Plot
            data={[
              {
                name: 'heatmap',
                type: 'heatmap',
                x: this.state.corrCol,
                y: this.state.corrCol,
                z: this.state.corr
              }
            ]}
            layout={{
              title: 'Heatmap',
              width: 475,
              height: 500,
              xaxis: {},
              yaxis: {}
            }}
          />
        </div>
      </>
    );
  }
}

export default Plots;
