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
  handleChange(event, index) {
    console.log("SearchBar: handleChange - " +index+"="+event.target.value);
    switch(index){
      case 'area':
        this.setState({area: event.target.value});
        break;
      case 'sub_area':
        this.setState({sub_area: event.target.value});
        break;
      case 'tag':
        this.setState(prevState => ({
          tags: event.target.value+','+prevState.tags
        }))
        break;
      case 'limit':
        this.setState({limit: event.target.value});
    }
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
    var params = "area="+this.state.area+"&sub_area="+this.state.sub_area+"&tags="+this.state.tags+"&limit="+this.state.limit;
    console.log("SearchBar: handleSubmit - "+ params);
    alert('Your favorite flavor is: ' + params);
    this.setState({value: params });
    this.props.onSubmit(params);

  }
  render(){
    return(
      <div>
        <Form inline style={{background:'#22A7F0', height:'55px'}}>
          <FormControl type="text" placeholder="City, Region or Country" className="mr-sm-2" style={{width: '45%', marginLeft:'5%'}}/>
          <Button variant="outline-light" style={{width:'10%',border:'none', background:'#4B77BE', fontWeight:'bold'}}>Search</Button>
        </Form>
        <Form style={{}}>
            <Form.Group as={Col} controlId="formGridState" style={{width:'30%'}}>
              <Form.Label>State</Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState" style={{width:'30%', display:'-webkit-inline-box'}}>
              <Form.Label>State</Form.Label>
              <OptionsList index="area"	onChange={this.handleChange} />
              <OptionsList index="sub_area" onChange={this.handleChange} />
              <OptionsList index="tag" onChange={this.handleChange} />
            </Form.Group>
          <Button onClick={this.handleSubmit} variant="primary" type="submit" style={{marginLeft:'40%',marginTop:'40%'}}>
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default SearchBar