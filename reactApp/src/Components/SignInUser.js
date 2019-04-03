import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import {Form, FormControl, Button } from 'react-bootstrap';

class SignInUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: {},
      logged_in:false
    }
    this.renderSignIn = this.renderSignIn.bind(this);
    this.renderLoggedIn = this.renderLoggedIn.bind(this);
    this.setUser = this.setUser.bind(this);
    this.signInUser = this.signInUser.bind(this);
  }
  signInUser() {
    console.log("signInUser")
    var url = "http://localhost:3000/signInUser"
    axios.post(url, {
        'email': this.state.email,
        'pass': this.state.password,
    })
    .then((res) => {
      console.log("res.data" + res.data)
      if(res.data === null){
        alert('Not Found');
        this.renderSignIn();
      } else {
        this.setState({
          user: res.data,
          logged_in:true
        });
      }
     })

  }
  setUser(e) {
    console.log("setUser")
  	e.preventDefault();
  	var email = document.getElementById('email').value,
        password = document.getElementById('password').value;
  	this.setState({
      email: email,
      password: password
  	}, ()=>{
        this.signInUser();
    });
  }

  renderSignIn(){
    return (
      <div className="signup-form">
      <Form>
        <h2>Sign Up</h2>
        <p>Please fill in this form to login</p>
        <hr/>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email" />
          <Form.Text className="text-muted">

          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">

        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.setUser} style={{width:'330px', marginBottom:'20px'}}>
          Login
        </Button>
        <div className="text-center">Dont have an account? <a href="http://localhost:3001/SignInUser">Sign Up</a></div>
      </Form>

      </div>

    )
  }
  renderLoggedIn(){
    const logged_in = this.state.logged_in;
    if (logged_in === true)
    // alert(this.state.name + ' You Have Been Successfully Registered!');
    return(
      <div>
      <Redirect to={{
            pathname: '/home',
            state: { name: this.state.user.name }
          }}
      />
      </div>
    )
  }
  render(){
    if(this.state.logged_in == false){
      return this.renderSignIn()
    }else {
      return this.renderLoggedIn()
    }
  }
}
export default SignInUser
