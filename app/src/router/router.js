import React from "react";
import { Route } from "react-router-dom";
import Main from "../Components/Main";
import Header from "../Header"

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header/>
            <Route exact path="/" component={Main}/>
        </React.Fragment>
        );
}

export default ReactRouter;