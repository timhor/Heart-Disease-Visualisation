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
  }

class Plots extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }


    async getStats() {
      const response = await backend.get('/stats/');
      var stats = this.state;
      for (var property in stats) stats[property] = [];
      for (var i = 0; i < response.data.length; i++) {
        for (var property in response.data[i]) {
            stats[property].push(response.data[i][property])
        }
      }
      this.setState(stats);
      console.log(stats);
      console.log(response);
    }
  
    async getStat(stat) {
      const response = await backend.get('/stats/' + stat);
      console.log(response);
    }

    heartDisease(min, max, hasHeartDisease) {
        const vals = this.state.target.filter((val, index) => val === hasHeartDisease && this.state.age[index] >= min && this.state.age[index] <= max);
        console.log(vals);
        var sum = 0;
        for (var i = 0; i < vals.length; i++) {
          sum += vals[i];
        }
        //console.log(sum/vals.length);
        return sum/vals.length
    }
  
    render() {
  
      return (
        <div>
          <Button
            variant="contained"
            color="default"
            className="Button"
            onClick={() => {this.getStats()}}
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
          <div className="plots" >
            <Plot
              data={[
                {
                  name: 'Males vs CP',
                  type: 'bar',
                  x: ["typical angina", "asymptomatic", "non-anginal pain", "atypical angina"],
                  y: [
                    this.state.sex.filter((val,index) => val === "M" && this.state.cp[index] === "typical angina").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.cp[index] === "asymptomatic").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.cp[index] === "non-anginal pain").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.cp[index] === "atypical angina").length
                  ], 
                  marker: {
                    color: "rgba(100, 200, 102, 0.7)",
                    line: {
                      color:  "rgba(100, 200, 102, 1)", 
                      width: 1
                    }
                  }
                },
                {
                  name: 'Females vs CP',
                  type: 'bar',
                  x: ["typical angina", "asymptomatic", "non-anginal pain", "atypical angina"],
                  y: [
                    this.state.sex.filter((val,index) => val === "F" && this.state.cp[index] === "typical angina").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.cp[index] === "asymptomatic").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.cp[index] === "non-anginal pain").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.cp[index] === "atypical angina").length
                  ], 
                  marker: {
                    color: "green",
                    line: {
                      color:  "green", 
                      width: 1
                    } 
                 
                  }
                }  
              ]}
              layout={{
                title: 'Sex vs CP',
                width: 475,
                height: 500,
                xaxis: {title: 'CP'},
                yaxis: {title: 'Count'},
                barmode: 'group'
              }}
            />
            <Plot
              data={[
                {
                  name: 'Males vs Exang',
                  type: 'bar',
                  x: ["yes", "no"],
                  y: [
                    this.state.sex.filter((val,index) => val === "M" && this.state.exang[index] === "yes").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.exang[index] === "no").length
                  ], 
                  marker: {
                    color: "rgba(100, 200, 102, 0.7)",
                    line: {
                      color:  "rgba(100, 200, 102, 1)", 
                      width: 1
                    }
                  }
                },
                {
                  name: 'Females vs Exang',
                  type: 'bar',
                  x: ["yes", "no"],
                  y: [
                    this.state.sex.filter((val,index) => val === "F" && this.state.exang[index] === "yes").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.exang[index] === "no").length
                  ],
                  marker: {
                    color: "green",
                    line: {
                      color:  "green", 
                      width: 1
                    } 
                 
                  }
                }  
              ]}
              layout={{
                title: 'Sex vs Exang',
                width: 475,
                height: 500,
                xaxis: {title: 'Exang'},
                yaxis: {title: 'Count'},
                barmode: 'group'
              }}
            />
            <Plot
              data={[
                {
                  name: 'Males vs FBS',
                  type: 'bar',
                  x: ["> 120mg/dl", "<= 120mg/dl"],
                  y: [
                    this.state.sex.filter((val,index) => val === "M" && this.state.fbs[index] === "> 120mg/dl").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.fbs[index] === "<= 120mg/dl").length
                  ], 
                  marker: {
                    color: "rgba(100, 200, 102, 0.7)",
                    line: {
                      color:  "rgba(100, 200, 102, 1)", 
                      width: 1
                    }
                  }
                },
                {
                  name: 'Females vs FBS',
                  type: 'bar',
                  x: ["> 120mg/dl", "<= 120mg/dl"],
                  y: [
                    this.state.sex.filter((val,index) => val === "F" && this.state.fbs[index] === "> 120mg/dl").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.fbs[index] === "<= 120mg/dl").length
                  ], 
                  marker: {
                    color: "green",
                    line: {
                      color:  "green", 
                      width: 1
                    } 
                 
                  }
                }  
              ]}
              layout={{
                title: 'Sex vs FBS',
                width: 475,
                height: 500,
                xaxis: {title: 'FBS'},
                yaxis: {title: 'Count'},
                barmode: 'group'
              }}
            />
            <Plot
              data={[
                {
                  name: 'Males vs Restecg',
                  type: 'bar',
                  x: ["left ventricular hypertrophy", "normal"],
                  y: [
                    this.state.sex.filter((val,index) => val === "M" && this.state.restecg[index] === "left ventricular hypertrophy").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.restecg[index] === "normal").length
                  ], 
                  marker: {
                    color: "rgba(100, 200, 102, 0.7)",
                    line: {
                      color:  "rgba(100, 200, 102, 1)", 
                      width: 1
                    }
                  }
                },
                {
                  name: 'Females vs Restecg',
                  type: 'bar',
                  x: ["left ventricular hypertrophy", "normal"],
                  y: [
                    this.state.sex.filter((val,index) => val === "F" && this.state.restecg[index] === "left ventricular hypertrophy").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.restecg[index] === "normal").length
                  ],  
                  marker: {
                    color: "green",
                    line: {
                      color:  "green", 
                      width: 1
                    } 
                 
                  }
                }  
              ]}
              layout={{
                title: 'Sex vs Restecg',
                width: 475,
                height: 500,
                xaxis: {title: 'Restecg'},
                yaxis: {title: 'Count'},
                barmode: 'group'
              }}
            />
            <Plot
              data={[
                {
                  name: 'Males vs Slope',
                  type: 'bar',
                  x: ["down", "up", "flat"],
                  y: [
                    this.state.sex.filter((val,index) => val === "M" && this.state.slope[index] === "down").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.slope[index] === "up").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.slope[index] === "flat").length,
                  ], 
                  marker: {
                    color: "rgba(100, 200, 102, 0.7)",
                    line: {
                      color:  "rgba(100, 200, 102, 1)", 
                      width: 1
                    }
                  }
                },
                {
                  name: 'Females vs Slope',
                  type: 'bar',
                  x: ["down", "up", "flat"],
                  y: [
                    this.state.sex.filter((val,index) => val === "F" && this.state.slope[index] === "down").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.slope[index] === "up").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.slope[index] === "flat").length,
                  ], 
                  marker: {
                    color: "green",
                    line: {
                      color:  "green", 
                      width: 1
                    } 
                 
                  }
                }  
              ]}
              layout={{
                title: 'Sex vs Slope',
                width: 475,
                height: 500,
                xaxis: {title: 'Slope'},
                yaxis: {title: 'Count'},
                barmode: 'group'
              }}
            />
            <Plot
              data={[
                {
                  name: 'Males vs Thal',
                  type: 'bar',
                  x: ["fixed defect", "normal", "reversable defect"],
                  y: [
                    this.state.sex.filter((val,index) => val === "M" && this.state.thal[index] === "fixed defect").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.thal[index] === "normal").length,
                    this.state.sex.filter((val,index) => val === "M" && this.state.thal[index] === "reversable defect").length,
                  ], 
                  marker: {
                    color: "rgba(100, 200, 102, 0.7)",
                    line: {
                      color:  "rgba(100, 200, 102, 1)", 
                      width: 1
                    }
                  }
                },
                {
                  name: 'Females vs Thal',
                  type: 'bar',
                  x: ["fixed defect", "normal", "reversable defect"],
                  y: [
                    this.state.sex.filter((val,index) => val === "F" && this.state.thal[index] === "fixed defect").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.thal[index] === "normal").length,
                    this.state.sex.filter((val,index) => val === "F" && this.state.thal[index] === "reversable defect").length,
                  ], 
                  marker: {
                    color: "green",
                    line: {
                      color:  "green", 
                      width: 1
                    } 
                 
                  }
                }  
              ]}
              layout={{
                title: 'Sex vs Thal',
                width: 475,
                height: 500,
                xaxis: {title: 'Thal'},
                yaxis: {title: 'Count'},
                barmode: 'group'
              }}
            />
            <Plot
              data={[
                {
                  name: 'scatter chart',
                  mode: 'markers',
                  type: 'scatter',
                  x: this.state.age,
                  y: this.state.chol,
                  marker: {
                    color: "rgba(255, 100, 102, 0.7)", 
                     line: {
                      color:  "rgba(255, 100, 102, 1)", 
                      width: 1
                    }
                  }
                }
              ]}
              layout={{
                title: 'Chol vs Age',
                width: 475,
                height: 500,
                xaxis: {title: 'Age'},
                yaxis: {title: 'Chol'},
              }}
            />
            <Plot
              data={[
                {
                  name: 'scatter chart',
                  mode: 'markers',
                  type: 'scatter',
                  x: this.state.age,
                  y: this.state.ca,
                  marker: {
                    color: "rgba(255, 100, 102, 0.7)", 
                     line: {
                      color:  "rgba(255, 100, 102, 1)", 
                      width: 1
                    }
                  }
                }
              ]}
              layout={{
                title: 'CA vs Age',
                width: 475,
                height: 500,
                xaxis: {title: 'Age'},
                yaxis: {title: 'CA'},
              }}
            />
            <Plot
              data={[
                {
                  name: 'scatter chart',
                  mode: 'markers',
                  type: 'scatter',
                  x: this.state.age,
                  y: this.state.oldpeak,
                  marker: {
                    color: "rgba(255, 100, 102, 0.7)", 
                     line: {
                      color:  "rgba(255, 100, 102, 1)", 
                      width: 1
                    }
                  }
                }
              ]}
              layout={{
                title: 'Oldpeak vs Age',
                width: 475,
                height: 500,
                xaxis: {title: 'Age'},
                yaxis: {title: 'Oldpeak'},
              }}
            />
            <Plot
              data={[
                {
                  name: 'scatter chart',
                  mode: 'markers',
                  type: 'scatter',
                  x: this.state.age,
                  y: this.state.thalach,
                  marker: {
                    color: "rgba(255, 100, 102, 0.7)", 
                     line: {
                      color:  "rgba(255, 100, 102, 1)", 
                      width: 1
                    }
                  }
                }
              ]}
              layout={{
                title: 'Thalach vs Age',
                width: 475,
                height: 500,
                xaxis: {title: 'Age'},
                yaxis: {title: 'Thalach'},
              }}
            />
            <Plot
              data={[
                {
                  name: 'scatter chart',
                  mode: 'markers',
                  type: 'scatter',
                  x: this.state.age,
                  y: this.state.trestbps,
                  marker: {
                    color: "rgba(255, 100, 102, 0.7)", 
                     line: {
                      color:  "rgba(255, 100, 102, 1)", 
                      width: 1
                    }
                  }
                }
              ]}
              layout={{
                title: 'Trestbps vs Age',
                width: 475,
                height: 500,
                xaxis: {title: 'Age'},
                yaxis: {title: 'Trestbps'},
              }}
            />
            <Plot
              data={[
                {
                  name: 'heatmap',
                  type: 'heatmap',
                  x: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-99'],
                  y: ['Yes', 'No'],
                  z: [[this.heartDisease(0,9,1), this.heartDisease(10,19,1), this.heartDisease(20,29,1), this.heartDisease(30,39,1), this.heartDisease(40,49,1), this.heartDisease(50,59,1), this.heartDisease(60,69,1), this.heartDisease(70,79,1), this.heartDisease(80,89,1), this.heartDisease(90,99,1)],
                       this.heartDisease(0,9,0), this.heartDisease(10,19,0), this.heartDisease(20,29,0), this.heartDisease(30,39,0), this.heartDisease(40,49,0), this.heartDisease(50,59,0), this.heartDisease(60,69,0), this.heartDisease(70,79,0), this.heartDisease(80,89,0), this.heartDisease(90,99,0)]
                }
              ]}
              layout={{
                title: 'Age Heart Disease Heatmap',
                width: 475,
                height: 500,
                xaxis: {title: 'Age'},
                yaxis: {title: 'Heart Disease'},
              }}
            />
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
                width: 475,
                height: 500
              }}
            />
            <Plot
              data={[
                {
                  name: 'bar chart',
                  x: this.state.age,
                  y: this.state.ca, 
                  autobinx: false, 
                  marker: {
                          color: "rgba(100, 200, 102, 0.7)",
                          line: {
                            color:  "rgba(100, 200, 102, 1)", 
                            width: 1
                    } 
                      }, 
                  name: 'histogram chart', 
                  type: "histogram", 
                  xbins: {      
                    size: 5
                  },
                  histfunc: "sum"
                }
              ]}
              layout={{
                title: 'Sample Plot',
                width: 475,
                height: 500
              }}
            />
          </div>
        </div>
      );
    }
  }

  export default Plots;