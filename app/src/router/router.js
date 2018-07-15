import React from "react";
import { Route } from "react-router-dom";
import Main from "../Components/Main";
import Header from "../Components/Header"
import UsersList from "../Components/UsersList"
import EventsList from "../Components/EventsList"
import CategoriesList from "../Components/CategoriesList"
import EquipmentsList from "../Components/EquipmentsList"
import CreateEvent from "../Components/createEvent"
import UserInterface from "../Components/userInterface"
import MyEvents from "../Components/myEvents"

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header/>
            <Route exact path="/" component={Main}/>
            <Route exact path="/users" component={UsersList}/>
            <Route exact path="/events" component={EventsList}/>
            <Route exact path="/myEvents" component={MyEvents}/>
            <Route exact path="/categories" component={CategoriesList}/>
            <Route exact path="/equipments" component={EquipmentsList}/>
            <Route exact path="/createEvent" component={CreateEvent}/>
            <Route exact path="/userInterface" component={UserInterface}/>

        </React.Fragment>
        );
}

export default ReactRouter;
