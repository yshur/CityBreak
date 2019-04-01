import React, { Component } from 'react'
import axios from 'axios'
import Header from "./Header";
// import Alert from "./Alert";

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
  }
}
  render(){
    return(
      <div>
        <Header/>
        <b>Hi {this.props.location.state.name} </b>
      </div>
    )
  }
}

export default Home
