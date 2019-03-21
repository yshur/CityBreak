import React from "react";
import { Route } from "react-router-dom";
import UsersList from "../components/UsersList";
import SignUp from "../components/SignUp";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Route exact path="/users" component={UsersList}/>
            <Route exact path="/signup" component={SignUp}/>
        </React.Fragment>
        );
}

export default ReactRouter;
