import React, { Component } from 'react'
import axios from 'axios'
import {Button } from 'react-bootstrap';

class SignUpAdmin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editing:false,
      name: "",
      phone:"",
      email:"",
      password:"",
      logged_in:false,
      url: "",
      method: "post",
      params: "",
      newAdmin: {}
  }
    this.setAdmin = this.setAdmin.bind(this);
    this.createAdmin = this.createAdmin.bind(this);
    this.renderSignUp = this.renderSignUp.bind(this);
    this.renderLoggedIn = this.renderLoggedIn.bind(this);

  }
  nextForm(e) {
    console.log("nextForm")

    console.log(this.state.editing)
      console.log(this.state.newEvent)
      console.log(this.state.url)
    e.preventDefault();
    this.setState({
      editing: this.state.editing+1
    });
  }

  createAdmin() {
    console.log("createAdmin")
    var url = "http://localhost:3000/createAdmin"
    axios.post(url, {
		    'name': this.state.name,
        'phone': this.state.phone,
        'email': this.state.email,
        'password': this.state.password,
		})
		.then((res) => {
				console.log("res.data" + res.data)
        this.setState({
          newAdmin: res.data,
          logged_in:true
        });
		 })

  }
  setAdmin(e) {
    console.log("setAdmin")
    console.log(this.state.editing)
    console.log(this.state.newAdmin)
    console.log(this.state.url)
  	e.preventDefault();
  	var name = document.getElementById('name').value,
        phone = document.getElementById('phone').value,
        email = document.getElementById('email').value,
        password = document.getElementById('password').value;
  	this.setState({
  		name: name,
      phone: phone,
      email: email,
      password: password,
      params: this.state.params+"name:"+name+",phone:"+phone+"email"+email+"password"+password,
      editing: true
  	}, ()=>{
      this.createAdmin();
  });

  }

  renderSignUp() {
    return (
      <div className="signup-form">
      <form onSubmit={this.setAdmin}>
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <hr/>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-Admin"></i></span>
            <input type="text" className="form-control" name="name" placeholder="Adminname" id="name" required="required"/>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-phone"></i></span>
            <input type="phone" className="form-control" name="phone" placeholder="Phone Number" id="phone" required="required"/>
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
      				<span className="input-group-addon"><i className="fa fa-lock"></i></span>
      				<input type="text" className="form-control" name="password" placeholder="Password" id="password" required="required"/>
      			</div>
          </div>
              <div className="form-group">
            <label className="checkbox-inline"><input type="checkbox" required="required"/> I accept the <Button>Terms of Use</Button> &amp; <Button>Privacy Policy</Button></label>
          </div>
          <div className="form-group">
                  <Button type="submit" className="btn btn-primary btn-lg" onClick={this.setAdmin}>Sign Up</Button>
              </div>
        </form>
        <div className="text-center">Already have an account? <Button>Login here</Button></div>
        </div>

    )
  }
  renderLoggedIn(){
    return(
      <div>
      <p> you have logged in </p>
      <h1> Welcome {this.state.newAdmin.name} </h1>
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
export default SignUpAdmin
