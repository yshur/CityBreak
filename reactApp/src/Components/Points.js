import React, { Component } from 'react'
import FilterablePointTable from "./FilterablePointTable";
import Header from "./Header";

class Points extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render(){
    return(
      <div>
        <Header />
        <FilterablePointTable />
      </div>
    )
  }
}

export default Points
