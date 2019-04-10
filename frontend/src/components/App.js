import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Plots from './Plots';
import Prediction from './Prediction';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            <Redirect to="/prediction" />
          )} />
          <Route path="/prediction" component={Prediction} />
          <Route path="/plots" component={Plots} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;
