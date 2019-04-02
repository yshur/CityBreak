import React, { Component } from 'react'
import Header from "./Header";
import ToursList from "./ToursList";
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
		<ToursList/>
      </div>
    )
  }
}

export default Home
