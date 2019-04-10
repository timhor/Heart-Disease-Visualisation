import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, Grid, withStyles } from '@material-ui/core';
import '../css/App.css';

const styles = {
  toolbar: {
    'padding-left': '40px',
    'padding-right': '40px'
  },
};

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" color="default">
        <Toolbar classes={{ root: classes.toolbar }}>
          <Typography variant="h6" color="inherit">
            ANTHEM
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Button color="primary">
                <Link to="/plots" style={{ textDecoration: 'none' }}>
                  Plots
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button color="secondary">
                <Link to="/prediction" style={{ textDecoration: 'none' }}>
                  Prediction
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
