import React, { Component } from "react";
import { Navbar, Nav,NavDropdown} from 'react-bootstrap';
import {Form, FormControl, Button } from 'react-bootstrap';

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
  }
}
  render(){
    return(
      <div>
      <Navbar bg="white" expand="lg">
        <Navbar.Brand href="#home" style={{color:'black', fontWeight:'bold'}}>City Break</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home" style={{color:'black'}}>Home</Nav.Link>
            <Nav.Link href="#link" style={{color:'black'}}>Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" >Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header
