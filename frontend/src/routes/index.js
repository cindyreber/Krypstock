import React from "react";
import { Switch, Route } from "react-router-dom";
import { Router } from 'react-router';
import history from '../history';
import Home from '../pages/home';
import SignIn from "../components/signIn/";
import SignUp from "../components/signUp/";
import Congratulation from "../components/congratulation/";
import Registration from "../components/registration/";
import Verification from "../components/verification";
import Portfolio from "../pages/portfolio";
import AddRemove from "../pages/addRemove";
import Search from "../pages/search";
import News from "../pages/news";


function OurRouter() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-in/" exact component={SignIn} />
        <Route path="/sign-up/" exact component={SignUp} />
         <Route path="/sign-up/registration" exact component={Registration}/>
        <Route path="/sign-up/congratulation" exact component={Congratulation}/>
        <Route path="/sign-up/verification" exact component={Verification} />
        <Route path="/portfolio/" exact component={Portfolio} />
        <Route path="/add-remove/" exact component={AddRemove} />
        <Route path="/search/" exact component={Search} />
        <Route path="/news/" exact component={News} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default OurRouter;