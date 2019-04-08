import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Grid
} from '@material-ui/core';
import '../css/App.css';


class Header extends Component {

    render() {
  
        return (
            <AppBar position="static" color="default" >
                <Toolbar>
                <Typography variant="h6" color="inherit"  >
                    ANTHEM
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Button color="primary" variant="outlined">
                    <Link to="/plots" style={{ textDecoration: 'none' }}>
                        Plots
                    </Link>
                    </Button>
                    <Button>
                    <Link to="/prediction" style={{ textDecoration: 'none' }}>
                        Prediction
                    </Link>
                    </Button>
                </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;