import React, {createContext, useState} from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './SignedIn/Home';
import Login from './SignedOut/Login';
import Signup from './SignedOut/Signup';

import AuthService from "./service/AuthService";


const PrivateRoute = ({ component: Component, ...rest }) => (
<Route
    {...rest}
    render={props =>
    AuthService.isAuthenticated() ? (
        <Component {...props} />
        // <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
    ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    )
    }
/>
);
  

const Routes = () => (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/home" component={(routeProps) => <Home {...routeProps}/>} />
        <Route path="/signup" component={(routeProps) => <Signup  {...routeProps}/>} />
        <Route exact path="/login" component={(routeProps) => <Login {...routeProps}/>} />
        <Route path="*" component={(routeProps) => <Home {...routeProps}/>} />
      </Switch>
    </BrowserRouter>
);

export default Routes;
