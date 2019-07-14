import React from "react";
import { Route } from "react-router-dom";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import Points from "../Components/Points";
import Main from "../Components/Main";
import Tours from "../Components/Tours";
import PointDetails from "../Components/PointDetails";
import TourDetails from "../Components/TourDetails";
import CreateTour from "../Components/CreateTour";
import UpdateTour from "../Components/UpdateTour";

const ReactRouter =()=>{
    return (
        <React.Fragment>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/points" component={Points}/>
          <Route exact path="/points/:id" component={PointDetails} />
          <Route exact path="/tours" component={Tours}/>
          <Route exact path="/tours/:id" component={TourDetails}/>
          <Route exact path="/createtour" component={CreateTour}/>
          <Route exact path="/updatetour/:id" component={UpdateTour}/>
        </React.Fragment>
        );
}

export default ReactRouter;
