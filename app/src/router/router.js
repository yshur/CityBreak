import React from "react";
import { Route } from "react-router-dom";
<<<<<<< HEAD
import UsersList from "../components/UsersList";
import SignUp from "../components/SignUp";
=======
import Main from "../Components/Main";
import Header from "../Components/Header"
import UsersList from "../Components/UsersList"
import AllEvent from "../Components/AllEvent"
import CategoriesList from "../Components/CategoriesList"
import EquipmentsList from "../Components/EquipmentsList"
import CreateEvent from "../Components/createEvent"
import UserInterface from "../Components/userInterface"
import MyEvents from "../Components/myEvents"

>>>>>>> 56a6717b7bb2c2a5058c1ed1654a4f714076eb06

const ReactRouter =()=>{
    return (
        <React.Fragment>
<<<<<<< HEAD
            <Route exact path="/users" component={UsersList}/>
            <Route exact path="/signup" component={SignUp}/>
=======
            <Header/>
            <Route exact path="/2017-2018/dcs/dev_180/" component={Main}/>
            <Route exact path="/" component={Main}/>
            <Route exact path="/users" component={UsersList}/>
            <Route exact path="/events" component={AllEvent}/>
            <Route exact path="/myEvents" component={MyEvents}/>
            <Route exact path="/categories" component={CategoriesList}/>
            <Route exact path="/equipments" component={EquipmentsList}/>
            <Route exact path="/createEvent" component={CreateEvent}/>
            <Route exact path="/userInterface" component={UserInterface}/>


>>>>>>> 56a6717b7bb2c2a5058c1ed1654a4f714076eb06
        </React.Fragment>
        );
}

export default ReactRouter;
