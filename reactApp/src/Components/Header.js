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
        <Navbar.Brand href="#home" style={{color:'#1F4788', fontWeight:'bold'}}>City Break</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{marginLeft:'90%'}}>
            <Nav.Link href="#home" style={{color:'#1F4788'}}>Sign in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header
