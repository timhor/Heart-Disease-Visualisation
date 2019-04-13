import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Plots from './Plots';
import Prediction from './Prediction';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <>
          <Route exact path="/" render={() => (
            <Redirect to="/plots" />
          )} />
          <Route path="/plots" component={Plots} />
          <Route path="/prediction" component={Prediction} />
        </>
      </Router>
    );
  }
}

export default AppRouter;
