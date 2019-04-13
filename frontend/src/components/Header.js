import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, Grid, withStyles } from '@material-ui/core';

const styles = theme => ({
  toolbar: {
    paddingLeft: '40px',
    paddingRight: '40px'
  },
  title: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px'
    }
  },
});

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" color="default">
        <Toolbar classes={{ root: classes.toolbar }}>
          <Typography
            className="test"
            classes={{ root: classes.title }}
            variant="h6"
            color="inherit"
          >
            Heart Disease | ANTHEM
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Button color="default">
                <Link to="/plots" style={{ textDecoration: 'none' }}>
                  Plots
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button color="default">
                <Link to="/factors" style={{ textDecoration: 'none' }}>
                  Factors
                </Link>
              </Button>
            </Grid>
            <Grid item>
              <Button color="default">
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
