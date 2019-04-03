import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

class SignUp extends Component {

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
      newUser: {}
  }
    this.setUser = this.setUser.bind(this);
    this.createUser = this.createUser.bind(this);
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

  createUser() {
    console.log("createUser")
    var url = "http://localhost:3000/createUser"
    axios.post(url, {
		    'name': this.state.name,
        'phone': this.state.phone,
        'email': this.state.email,
        'password': this.state.password,
		})
		.then((res) => {
				console.log("res.data" + res.data)
        this.setState({
          newUser: res.data,
          logged_in:true
        });
		 })

  }
  setUser(e) {
    console.log("setUser")
    console.log(this.state.editing)
    console.log(this.state.newUser)
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
      this.createUser();
  });
  }

  renderSignUp() {
    return (
      <div className="signup-form">
      <form onSubmit={this.setUser}>
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <hr/>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-user"></i></span>
            <input type="text" className="form-control" name="name" placeholder="Username" id="name" required="required"/>
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
            <label className="checkbox-inline"><input type="checkbox" required="required"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
          </div>
          <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg" onClick={this.setUser}>Sign Up</button>
              </div>
        </form>
        <div className="text-center">Already have an account? <a href="http://localhost:3001/SignInUser">Login here</a></div>
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
            pathname: '/home',
            state: { name: this.state.name }
          }}
      />
      </div>
    )
  }
  render(){
    if(this.state.logged_in == false){
      return this.renderSignUp()
    }else {
      return this.renderLoggedIn()
    }
  }
}
export default SignUp
