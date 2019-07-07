import React, { Component } from 'react'
import ToursList from "./ToursList";
import SearchBar from "./SearchBar";

class FilterableTourTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
    this.update = this.update.bind(this);
  }

  update(params) {
    console.log('update: '+params)
    this.setState({value: params});
  }
  render(){
    return(
      <div>
        <SearchBar onSubmit={this.update}/>
        <ToursList params={this.state.value} />
      </div>
    )
  }
}

export default FilterableTourTable
