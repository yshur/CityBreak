import React, { Component } from 'react'
import OptionsList from "./OptionsList";
import {Card} from 'react-bootstrap';
import {Form, FormControl, Button,ButtonToolbar,Col } from 'react-bootstrap';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      area: '',
      sub_area: '',
      tags: '',
      limit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(index, value) {
    console.log("SearchBar: handleChange - " +index+"="+value);
    this.setState({value: `${index}=${value}`});
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("SearchBar: handleSubmit - "+ this.state.value);
    this.props.onSubmit(this.state.value);
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
