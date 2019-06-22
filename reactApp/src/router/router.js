import React from "react";
import { Route } from "react-router-dom";
import UsersList from "../Components/UsersList";
import SignUp from "../Components/SignUp";
import SignUpAdmin from "../Components/SignUpAdmin";
import Home from "../Components/Home";
import Header from "../Components/Header";
import SignInUser from "../Components/SignInUser";
import SignInAdmin from "../Components/SignInAdmin";
import AdminHome from "../Components/AdminHome";
import Main from "../Components/Main";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Route exact path="/" component={SignInUser}/>
            <Route exact path="/users" component={UsersList}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/signupadmin" component={SignUpAdmin}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/header" component={Header}/>
            <Route exact path="/signinuser" component={SignInUser}/>
            <Route exact path="/signinadmin" component={SignInAdmin}/>
            <Route exact path="/adminhome" component={AdminHome}/>
            <Route exact path="/main" component={Main}/>
        </React.Fragment>
        );
}

export default ReactRouter;
