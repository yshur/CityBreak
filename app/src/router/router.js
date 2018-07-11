import React from "react";
import { Route } from "react-router-dom";
import Main from "../Components/Main";
import Admin from "../Components/Admin";
import Header from "../Components/Header"

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header/>
            <Route exact path="/" component={Main}/>
            <Route path="/Admin" component={Admin}/>
        </React.Fragment>
        );
}

export default ReactRouter;