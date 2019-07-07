import React, { Component } from 'react'
import PointsList from "./PointsList";
import SearchBar from "./SearchBar";

class FilterablePointTable extends Component {

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
        <PointsList params={this.state.value} />
      </div>
    )
  }
}

export default FilterablePointTable
