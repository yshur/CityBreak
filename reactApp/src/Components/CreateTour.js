import React, { Component } from 'react'
import Header from "./Header";
import {Card} from 'react-bootstrap';
import Cookies from 'js-cookie'
import {Form, FormControl, Button,ButtonToolbar,Col} from 'react-bootstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import AddPointsList from "./AddPointsList";

class CreateTour extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      about: '',
      editing: false,
      tour_id:''
    }
    this.edit = this.edit.bind(this);
    this.renderUI = this.renderUI.bind(this);
    this.renderForm = this.renderForm.bind(this);
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
    const url = `http://localhost:3000/addPoint/${this.state.tour_id}/${id}`
    console.log(url);
    const headers = {
      session_id: Cookies.get('session_id'),
      user_id: Cookies.get('user_id')
    }
    axios.post(url, headers)
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
  renderUI(){
    return (
      <div>
      <Header/>
        <Alert variant="primary">
          <Alert.Heading>Your tour has been successfully created !</Alert.Heading>
          <hr />
          <p className="mb-0">
            Continue to add points...
          </p>
        </Alert>
        <h1 style={{marginTop: '5%', textAlign: 'center'}}>Popular Points for your tour</h1>
        <AddPointsList onChange = {this.addPoint}/>
      </div>
    )
  }

  renderForm(){
    const { name, about } = this.state;
    return(
      <div>
        <Header/>
        <div className="container contact">
        	<div className="row">
        		<div className="col-md-3" >
        			<div className="contact-info">
        				<img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
        				<h2 style={{color:'rgb(31, 71, 136)'}}>Create Tour</h2>
        				<h4 style={{color:'rgb(31, 71, 136)'}}>We would love to suggest your tour !</h4>
        			</div>
        		</div>
        		<div className="col-md-9" >
        			<div className="contact-form">
        				<div className="form-group">
        				  <label className="control-label col-sm-2" >Tour Name:</label>
        				  <div className="col-sm-10">
        					<input type="text" className="form-control" id="fname" placeholder="Tour Name" name="fname"/>
        				  </div>
        				</div>
        				<div className="form-group">
        				  <label className="control-label col-sm-2" >About:</label>
        				  <div className="col-sm-10">
        					<textarea className="form-control" rows="5" id="comment"></textarea>
        				  </div>
        				</div>
        				<div className="form-group">
        				  <div className="col-sm-offset-2 col-sm-10">
        					<button onClick={this.edit} type="submit" className="btn btn-default">Submit</button>
        				  </div>
        				</div>
        			</div>
        		</div>
        	</div>
        </div>
      </div>
    )
  }
  render(){
    return this.state.editing ? this.renderUI() : this.renderForm()
  }
}

export default CreateTour
