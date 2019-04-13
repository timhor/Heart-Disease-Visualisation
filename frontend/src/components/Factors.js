import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import {
  Card,
  CardContent,
  Typography,
  withStyles
} from '@material-ui/core';
import '../css/App.css';

const styles = {
  card: {
    margin: '6px',
    textAlign: 'center'
  }
};

class Factors extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Header />
        <div className="container">
          <Card>
            <CardContent>
              <Typography classes={{ root: classes.card }} variant="h5">
                Factors
              </Typography>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
}

Factors.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Factors);
