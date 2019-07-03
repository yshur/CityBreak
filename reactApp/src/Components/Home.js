import React, { Component } from 'react'
import Header from "./Header";
import ToursList from "./ToursList";
import PointsList from "./PointsList";

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  render(){
    return(
      <div>
        <PointsList />
      </div>
    )
  }
}

export default Home
