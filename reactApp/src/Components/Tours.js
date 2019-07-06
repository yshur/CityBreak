import React, { Component } from 'react'
import FilterableTourTable from "./FilterableTourTable";
import Header from "./Header";

class Tours extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render(){
    return(
      <div>
        <Header />
        <FilterableTourTable />
      </div>
    )
  }
}

export default Tours
