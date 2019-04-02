import React, { Component } from 'react'
import Header from "./Header";
import AdminManagement from "./AdminManagement";
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
		    <AdminManagement/>
      </div>
    )
  }
}

export default AdminHome
