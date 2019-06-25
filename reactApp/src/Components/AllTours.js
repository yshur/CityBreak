import React, { Component } from 'react'
import Header from "./Header";
import ToursList from "./ToursList";
import AreasList from "./AreasList";
import {Card} from 'react-bootstrap';
import {Form, FormControl, Button,ButtonToolbar,Col } from 'react-bootstrap';


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      params: "",
      limit: 3
    }
    this.update = this.update.bind(this);
  }

  update(newBook, i) {
    console.log('update: '+i+' '+newBook)
    this.setState(prevState => ({
      Books: prevState.Books.map(
        Book => (Book.id !== i) ? Book : {...Book,bookname:newBook}
      )
    }))
  }
  render(){
    return(
      <div>
        <Header/>
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
              <AreasList index="area"	onChange={this.update} />
              <AreasList index="sub_area" onChange={this.update} />
              <AreasList index="tag" onChange={this.update} />
            </Form.Group>
          <Button variant="primary" type="submit" style={{marginLeft:'40%'}}>
            Submit
          </Button>
        </Form>
        <ToursList limit={this.state.limit} params={this.state.params} />
      </div>
    )
  }
}

export default Home
