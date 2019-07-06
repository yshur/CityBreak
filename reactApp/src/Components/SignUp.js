import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import {Button } from 'react-bootstrap';
import OptionsList from "./OptionsList";
import Header from "./Header";

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: true,
      required: false,
      uniqeUsername: true,
      uniqeEmail: true,
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      username: "",
      password: "",
      image_url: "",
      birthdate: "",
      tags: [],
      about: "",
      living_area: "",
      logged_in: false,
      url: "https://citybreakshenkar.herokuapp.com/",
      newUser: {}
    }

    this.checkUniqUsername = this.checkUniqUsername.bind(this);
    this.checkUniqEmail = this.checkUniqEmail.bind(this);
    this.fixUniqUsername = this.fixUniqUsername.bind(this);
    this.fixUniqEmail = this.fixUniqEmail.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setUser = this.setUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.renderSignUp = this.renderSignUp.bind(this);
    this.renderLoggedIn = this.renderLoggedIn.bind(this);
  }
  checkUniqUsername() {
    console.log("checkUniqUsername")
    var url = this.state.url+"isUsername"
    axios.post(url, {
        'username': this.state.username
    })
    .then((res) => {
        console.log("res.data" + res.data)
        if(res.data.count > 0) {
          this.setState({ uniqeUsername: false });
        }
     })
  }
  checkUniqEmail() {
    console.log("checkUniqEmail")
    var url = this.state.url+"isEmail"
    axios.post(url, {
        'email': this.state.email
    })
    .then((res) => {
        console.log("res.data" + res.data)
        if(res.data.count > 0) {
          this.setState({ uniqeEmail: false });
        }
     })
  }
  fixUniqUsername() {
    this.setState({ uniqeUsername: true });
  }
  fixUniqEmail() {
    this.setState({ uniqeEmail: true });
  }
  checkRequired() {
    if((this.state.username.length > 0) && (this.state.password.length > 0)
      && (this.state.first_name.length > 0) && (this.state.last_name.length > 0)
      && (this.state.email.length > 0) ) {
        this.setState({ required: true });
      }
  }
  handleChange(index, value) {
    console.log("handleChange - " +index+"="+value);
    if(index=='tag') {
      this.setState({tags: value});
    } else {
      this.setState({living_area: value});
    }
    console.log(this.state.tags);
    console.log(this.state.living_area);
  }
  createUser() {
    console.log("createUser")
    var url = this.state.url+"sign-up";
    console.log(url);
    axios.post(url, {
	    'first_name': this.state.first_name,
      'last_name': this.state.last_name,
      'phone': this.state.phone,
      'email': this.state.email,
      'username': this.state.username,
      'password': this.state.password,
      'image_url': this.state.image_url,
      'birthdate': this.state.birthdate,
      'tags': this.state.tags,
      'about': this.state.about,
      'living_area': this.state.living_area
		})
		.then((res) => {
      console.log(res.data)
      alert('Success');
      this.setState({
        newUser: res.data,
        logged_in: true
      });
		 })
  }
  setUser(e) {
    console.log("setUser")
  	e.preventDefault();
  	var first_name = document.getElementById('first_name').value,
        last_name = document.getElementById('last_name').value,
        phone = document.getElementById('phone').value,
        email = document.getElementById('email').value,
        username = document.getElementById('username').value,
        password = document.getElementById('password').value,
        image_url = document.getElementById('image_url').value,
        birthdate = document.getElementById('birthdate').value,
        about = document.getElementById('about').value;
  	this.setState({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
      username: username,
      password: password,
      image_url: image_url,
      birthdate: birthdate,
      about: about,
      editing: true
  	}, ()=>{
      this.createUser();
    });
  }
  renderSignUp() {
    return (
      <div>
        <Header />
        <div className="signup-form">
        <form onSubmit={this.setUser}>
          <h2>Sign Up</h2>
          <p>Please fill in this form to create an account!</p>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user-circle"></i></span>
              <input type="text" className="form-control" name="first_name" placeholder="First Name" id="first_name" required="required"/>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user-circle-o"></i></span>
              <input type="text" className="form-control" name="last_name" placeholder="Last Name" id="last_name" required="required"/>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-phone"></i></span>
              <input type="phone" className="form-control" name="phone" placeholder="Phone Number" id="phone" />
            </div>
          </div>
          <div className="form-group">
      			<div className="input-group">
      				<span className="input-group-addon"><i className="fa fa-paper-plane"></i></span>
      				<input type="email" className="form-control" name="email" placeholder="Email Address" id="email" required="required"/>
      			</div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input type="text" className="form-control" name="username" placeholder="UserName" id="username" required="required"/>
            </div>
          </div>
          <div className="form-group">
      			<div className="input-group">
      				<span className="input-group-addon"><i className="fa fa-lock"></i></span>
      				<input type="text" className="form-control" name="password" placeholder="Password" id="password" required="required"/>
      			</div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-image"></i></span>
              <input type="url" className="form-control" name="image_url" placeholder="Image URL" id="image_url" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
              <input type="date" className="form-control" name="birthdate" placeholder="Birthdate" id="birthdate" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-star"></i></span>
              <OptionsList index="tag" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
            <div className="form-group">
        			<div className="input-group">
        				<span className="input-group-addon"><i className="fa fa-home"></i></span>
                <OptionsList className="form-control" index="area"	onChange={this.handleChange} />
        			</div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-square"></i></span>
                <input type="textarea" className="form-control" name="about" placeholder="about" id="about" />
              </div>
            </div>
            <div className="form-group">
              <label className="checkbox-inline"><input type="checkbox" required="required"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg" onClick={this.setUser}>Sign Up</button>
            </div>
          </form>
          <div className="text-center">Already have an account? <a href="./login">Login here</a></div>
        </div>
      </div>
    )
  }
  renderLoggedIn(){
    const logged_in = this.state.logged_in;
    if (logged_in === true)
    alert(this.state.name + ' You Have Been Successfully Registered!');
    return(
      <div>
      <Redirect to={{
            pathname: '/login',
            state: { name: this.state.name }
          }}
      />
      </div>
    )
  }
  render(){
    if(this.state.logged_in === false){
      return this.renderSignUp()
    }else {
      return this.renderLoggedIn()
    }
  }
}
export default SignUp
