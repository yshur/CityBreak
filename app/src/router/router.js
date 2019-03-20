import React from "react";
import { Route } from "react-router-dom";
import UsersList from "../components/UsersList"

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Route exact path="/users" component={UsersList}/>
        </React.Fragment>
        );
}

export default ReactRouter;
