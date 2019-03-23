import React, { Component } from 'react'
import axios from 'axios'


class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editing:false,
      name: "",
      phone:"",
      email:"",
      password:"",
      url: "",
      method: "post",
      params: "",
      newUser: {}
  }
    this.setUser = this.setUser.bind(this);
    this.createUser = this.createUser.bind(this);

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
          newUser: res.data
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
  	});
    this.createUser()
  }

  render() {
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
        <div className="text-center">Already have an account? <a href="#">Login here</a></div>
        </div>

    )
  }
}
export default SignUp
