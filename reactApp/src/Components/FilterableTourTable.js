import React, { Component } from 'react'
import Header from "./Header";
import ToursList from "./ToursList";
import SearchBar from "./SearchBar";
import {Card} from 'react-bootstrap';
import {Form, FormControl, Button,ButtonToolbar,Col } from 'react-bootstrap';


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
        <Header/>
        <SearchBar onSubmit={this.update}/>
        <ToursList params={this.state.value} />
      </div>
    )
  }
}

export default FilterableTourTable
