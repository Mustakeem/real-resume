import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './constants/base.scss';

import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App({ isAuthenticated, isVerifying }) {

  return (
    <Switch>
      <ProtectedRoute
        exact
        path='/'
        component={Dashboard}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </Switch>
  );
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);