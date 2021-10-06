import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Posts from "../Posts/Posts";
import Cadastro from '../Cadastro/Cadastro'

const Pages = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/feed" component={Posts} />
      <Route exact path='/cadastro' component={Cadastro}/>
    </Switch>
  );
};

export default Pages;
