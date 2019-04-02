import React from "react";
import { Route } from "react-router-dom";
import UsersList from "../Components/UsersList";
import SignUp from "../Components/SignUp";
import SignUpAdmin from "../Components/SignUpAdmin";
import Home from "../Components/Home";
import Header from "../Components/Header";

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
