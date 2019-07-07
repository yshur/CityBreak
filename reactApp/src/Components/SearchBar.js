import React, { Component } from 'react'
import OptionsList from "./OptionsList";
import {Form, FormControl, Button,Col } from 'react-bootstrap';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      area: '',
      sub_area: '',
      tag: '',
      limit: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(index, value) {
    console.log("SearchBar: handleChange - " +index+"="+value);
    this.setState(() => ({
      [index]: value.toString()
    }))
    }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    var params1 = this.state.area.length > 0 ? "area="+this.state.area : '';
    var params2 = this.state.sub_area.length > 0 ? "sub_area="+this.state.sub_area : '';
    if((params1.length > 0) && (params2.length > 0)) {
      params1 = params1+"&"+params2
    } else if (params2.length > 0) {
      params1 = params2
      params2 = ''
    }
    var params2 = this.state.tag.length > 0 ? "tags="+this.state.tag : '';
    if((params1.length > 0) && (params2.length > 0)) {
      params1 = params1+"&"+params2
    } else if (params2.length > 0) {
      params1 = params2
      params2 = ''
    }
    console.log("SearchBar: handleSubmit - "+ params1);
    this.props.onSubmit(params1);
  }
  render(){
    return(
      <div>
        <Form inline style={{background:'#22A7F0', height:'55px'}}>
          <FormControl type="text" placeholder="City, Region or Country" className="mr-sm-2" style={{width: '45%', marginLeft:'5%'}}/>
          <Button variant="outline-light" style={{width:'10%',border:'none', background:'#4B77BE', fontWeight:'bold'}}>Search</Button>
        </Form>
        <Form style={{}}>
            <Form.Group as={Col} controlId="formGridState" style={{width:'30%', display:'-webkit-inline-box'}}>
              <OptionsList style={{margin:'10px'}} index="area"	onChange={this.handleChange} />
              <OptionsList style={{margin:'10px'}} index="sub_area" onChange={this.handleChange} />
              <OptionsList style={{margin:'10px'}} index="tag" onChange={this.handleChange} />
            </Form.Group>
          <Button onClick={this.handleSubmit} variant="primary" type="submit" style={{marginLeft:'10%',marginTop:'5%'}}>
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default SearchBar
