import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import Header from "./Header";

class CreateTour extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tour: null,
      name: '',
      about: '',
      editing: false,
      tour_id:''
    }
    this.edit = this.edit.bind(this);
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
    axios.post('https://citybreakshenkar.herokuapp.com/createtour', { name, about }, {headers})
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
  render(){
    return(
      <div>
        <Header />
        <div className="container contact">
        	<div className="row">
        		<div className="col-md-3" >
        			<div className="contact-info">
        				<img src="https://image.ibb.co/kUASdV/contact-image.png" alt="some img"/>
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
}

export default CreateTour
