import React from "react";
import { Route } from "react-router-dom";
import UsersList from "../components/UsersList";
import SignUp from "../components/SignUp";
import SignUpAdmin from "../components/SignUpAdmin";
import Home from "../components/Home";
import Header from "../components/Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Route exact path="/users" component={UsersList}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/signupadmin" component={SignUpAdmin}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/header" component={Header}/>
        </React.Fragment>
        );
}

export default ReactRouter;
