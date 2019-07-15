import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Button} from 'react-bootstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import FilterablePointTable from "./FilterablePointTable";
import Header from "./Header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class UpdateTour extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tour: this.props.location.state.tour
    }
    this.edit = this.edit.bind(this);
    this.addPoint = this.addPoint.bind(this);
  }
  edit() {
    this.setState({
      editing: true
    })
    const { name, about } = this.state;
    const headers = {
      session_id: Cookies.get('session_id'),
      user_id: Cookies.get('user_id')
    }
    console.log(headers);
    axios.post('http://localhost:3000/createtour', { name, about }, {headers})
      .then((result) => {
        //access the results here....
        this.setState({tour_id:result.data._id})
        console.log(result);
      }).catch(function (error) {
         if (error.response) {
           alert("Unautorized");
           console.log(error.response.data);
           console.log(error.response.status);
           // console.log(error.response.headers);
         }
       });
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  addPoint(id){
    console.log(id);
    const url = `http://localhost:3000/addPoint/${this.state.tour._id}/${id}`
    console.log(url);
    const headers = {
      session_id: Cookies.get('session_id'),
      user_id: Cookies.get('user_id')
    }
    console.log(headers);
    axios.post(url, {}, {headers})
      .then((result) => {
        //access the results here....
        console.log(result);
      }).catch(function (error) {
         if (error.response) {
           alert("Error");
           console.log(error.response.data);
           console.log(error.response.status);
           // console.log(error.response.headers);
         }
       });
  }
  render(){
    return (
    <div>
      <Header />
      <div>
        <Alert variant="primary">
          <Alert.Heading>Your tour has been successfully created !</Alert.Heading>
          <hr />
          <p className="mb-0">
            Continue to add points...
          </p>
        </Alert>
        <h1 style={{marginTop: '5%', textAlign: 'center'}}>Popular Points for your tour</h1>
        <FilterablePointTable onChange={this.addPoint} tour={this.state.tour} />
        <Link to={{
            pathname: '/tours/'+this.state.tour._id,
            state: {
              tour: this.state.tour
            }
          }}>
          <Button style={{marginTop:'85px',marginLeft:'100px'}} type="submit" className="btn btn-default">Submit</Button>
        </Link>
      </div>
    </div>
    )
  }
}

export default UpdateTour
