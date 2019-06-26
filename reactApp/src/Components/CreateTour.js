import React, { Component } from 'react'
import Header from "./Header";
import {Card} from 'react-bootstrap';
import {Form, FormControl, Button,ButtonToolbar,Col} from 'react-bootstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'


class CreateTour extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      about: '',
      editing: false
    }
    this.edit = this.edit.bind(this);
    this.renderUI = this.renderUI.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.routeChange = this.routeChange.bind(this);
}
  edit() {
    this.setState({
      editing: true
    })
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name);
    console.log(e.target.value);
  }
  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { name, about } = this.state;
    axios.post('http://localhost:3000/createtour', { name, about })
      .then((result) => {
        //access the results here....
        console.log(result);
      });
  }
  routeChange() {
    let path = `addPoint`;
    this.props.history.push(path);
  }
  renderUI(){
    return (
      <div>
      <Header/>
        <Alert variant="primary">
          <Alert.Heading>Your tour has been successfully created !</Alert.Heading>
          <hr />
          <p className="mb-0">
            Continue to add points...
          </p>
          <Button onClick={this.routeChange} variant="primary" type="submit" style={{marginTop:'2%'}}>
            Add point
          </Button>
        </Alert>
      </div>
    )
  }

  renderForm(){
    const { name, about } = this.state;
    return(
      <div>
        <Header/>
          <Form inline style={{background:'#22A7F0', height:'55px'}}>
            <h1 style={{color:'black', fontSize:'24px', marginLeft:'40%'}}> Create your own tour </h1>
          </Form>
          <Form onSubmit={this.onSubmit}>
            <Form.Text className="text-muted" style={{marginTop:'2%'}}>
              Fill the fields and submit
            </Form.Text>
              <input type="text" placeholder="Tour name" name='name' style={{width:'100%'}} onChange={this.onChange} />
              <br/>
              <input type="text" placeholder="About" name='about' style={{width:'100%',marginTop:'2%'}} onChange={this.onChange} />
              <br/>
            <Button onClick={this.edit} variant="primary" type="submit" style={{marginTop:'2%'}}>
              Submit
            </Button>
        </Form>
      </div>
    )
  }
  render(){
    return this.state.editing ? this.renderUI() : this.renderForm()
  }
}

export default CreateTour