import React from "react";
import Cookies from 'js-cookie'
import { Route } from "react-router-dom";
import UsersList from "../Components/UsersList";
import SignUp from "../Components/SignUp";
import SignUpAdmin from "../Components/SignUpAdmin";
import Home from "../Components/Home";
import Header from "../Components/Header";
import Login from "../Components/Login";
import SignInAdmin from "../Components/SignInAdmin";
import AdminHome from "../Components/AdminHome";
import Main from "../Components/Main";
import FilterableTourTable from "../Components/FilterableTourTable";
import FilterablePointTable from "../Components/FilterablePointTable";
import Tours from "../Components/Tours";
import PointDetails from "../Components/PointDetails";
import TourDetails from "../Components/TourDetails";
import CreateTour from "../Components/CreateTour";

const ReactRouter =()=>{
    return (
        <React.Fragment>
        <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
            <Route exact path="/Header" component={Header}/>
            <Route exact path="/users" component={UsersList}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/signupadmin" component={SignUpAdmin}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/header" component={Header}/>
            <Route exact path="/signinadmin" component={SignInAdmin}/>
            <Route exact path="/adminhome" component={AdminHome}/>
            <Route exact path="/main" component={Main}/>
            <Route exact path="/alltours" component={FilterableTourTable}/>
            <Route exact path="/allpoints" component={FilterablePointTable}/>
            <Route exact path="/tours" component={Tours}/>
            <Route exact path="/createtour" component={CreateTour}/>
            <Route exact path="/pointdetails" component={PointDetails}/>
            <Route exact path="/tourdetails" component={TourDetails}/>
        </React.Fragment>
        );
}

export default ReactRouter;
