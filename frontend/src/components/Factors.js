import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles
} from '@material-ui/core';
import '../css/App.css';
import '../css/Factors.css';
import shapPlot from '../assets/SHAP_summary_plot.png';

const styles = {
  card: {
    margin: '30px 0'
  },
  weight: {
    width: '50%',
    paddingRight: '35% !important'
  }
};

let id = 0;
function createData(feature, weight) {
  id += 1;
  return { id, feature, weight };
}

const permutationImportanceRows = [
  createData('cp: asymptomatic', '0.0467 ± 0.0249'),
  createData('thal: normal', '0.0367 ± 0.0249'),
  createData('oldpeak', '0.0267 ± 0.0340'),
  createData('exang: yes', '0.0200 ± 0.0133'),
  createData('slope: flat', '0.0100 ± 0.0163'),
  createData('ca', '0.0100 ± 0.0452'),
  createData('thal: reversable defect', '0.0067 ± 0.0163'),
  createData('thal: fixed defect', '0.0067 ± 0.0163'),
  createData('slope: up', '0.0067 ± 0.0163'),
  createData('trestbps', '0.0067 ± 0.0163'),
  createData('chol', '0.0033 ± 0.0133'),
  createData('thalach', '0.0000 ± 0.0211'),
  createData('cp: atypical angina', '0 ± 0.0000'),
  createData('sex: F', '0 ± 0.0000'),
  createData('sex: M', '0 ± 0.0000'),
  createData('fbs: <= 120mg/dl', '0 ± 0.0000'),
  createData('cp: typical angina', '0 ± 0.0000'),
  createData('fbs: > 120mg/dl', '0 ± 0.0000'),
  createData('restecg: ST-T wave abnormality', '0 ± 0.0000'),
  createData('restecg: left ventricular hypertrophy', '0 ± 0.0000'),
  createData('restecg: normal', '0 ± 0.0000'),
  createData('slope: down', '0 ± 0.0000'),
  createData('exang: no', '-0.0033 ± 0.0249'),
  createData('cp: non-anginal pain', '-0.0100 ± 0.0163'),
  createData('age', '-0.0233 ± 0.0340')
];

class Factors extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Header />
        <div className="container">
          <Typography variant="subheading" paragraph={true}>
            This page shows potential important attributes related to heart
            disease. There are many ways to determine how important each
            feature is in our Random Forest Classifier model; two are
            described below. Note that the top six features from both
            methods coincide with one another.
          </Typography>
          <Paper classes={{ root: classes.card }}>
            <div className="card-content">
              <Typography variant="h5" paragraph={true}>
                Permutation Importance
              </Typography>
              <Typography variant="subheading">
                We start off with one of the easiest, widely used methods to
                determine the weights of each feature in the fitted model.
                How permutation importance works is we shuffle the feature
                values of a single column within the dataframe and make new
                predictions, then we calculate the loss between the new and
                old predictions. We can see exactly which features this
                method determines is most important below.
              </Typography>
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Feature</TableCell>
                  <TableCell align="right" style={{ paddingRight: '112px' }}>
                    Weight
                  </TableCell>
                  {/* placeholders for padding */}
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {permutationImportanceRows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <code>{row.feature}</code>
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {row.weight}
                    </TableCell>
                    {/* placeholders for padding */}
                    <TableCell component="th" scope="row" />
                    <TableCell component="th" scope="row" />
                    <TableCell component="th" scope="row" />
                    <TableCell component="th" scope="row" />
                    <TableCell component="th" scope="row" />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Paper classes={{ root: classes.card }}>
            <div className="card-content">
              <Typography variant="h5" paragraph={true}>
                SHAP (SHapley Additive exPlanations)
              </Typography>
              <Typography variant="subheading" paragraph={true}>
                SHAP allows us to provide insights on our blackbox model on
                an individual prediction. It shows us the impact of a
                certain value from a feature compared to the impact if we
                provided a baseline value. We provide a summary bar plot to
                show the results below.
              </Typography>
              <div className="shap-plot">
                <img src={shapPlot} alt="SHAP Plot" />
              </div>
            </div>
          </Paper>
        </div>
      </>
    );
  }
}

Factors.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Factors);
