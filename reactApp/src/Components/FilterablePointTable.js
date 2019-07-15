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
    this.save = this.save.bind(this)
  }
  save(index) {
		if(this.props.onChange) {
			this.props.onChange(index)
		}
	}
  update(params) {
    console.log('update: '+params)
    this.setState({value: params});
  }
  render(){
    return(
      <div>
        <SearchBar onSubmit={this.update}/>
        <PointsList params={this.state.value} onChange={this.save} tour={this.props.tour} />
      </div>
    )
  }
}

export default FilterablePointTable
