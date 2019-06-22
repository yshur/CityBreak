import React, { Component } from 'react'
import Header from "./Header";
import AdminInterface from "./AdminInterface";
// import Alert from "./Alert";

class AdminHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
  }
}
  render(){
    return(
      <div>
        <Header/>
        <p> xxx </p>
		    <AdminInterface/>
      </div>
    )
  }
}

export default AdminHome
