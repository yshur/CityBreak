import React, { Component } from 'react'
import Header from "./Header";
import ToursList from "./ToursList";
import {Card} from 'react-bootstrap';
import {Form, FormControl, Button } from 'react-bootstrap';
import mainImg from'./ban1.jpg';


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
  }
}
  render(){
    return(
      <div>
        <Header/>
        <Card className="bg-dark text-white">
          <Card.Img src={mainImg} style={{height:'400px'}} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title style={{color:'black',fontSize:'56px', textAlign:'center', marginTop:'7%'}}>What's your destenation ?</Card.Title>
            <Form inline style={{marginLeft:'28%', marginTop:'20px'}}>
            <FormControl type="text" placeholder="City, Region or Country" className="mr-sm-2" style={{width: '45%'}}/>
            <Button variant="outline-light" style={{width:'15%', background:'#19aa8d'}}>Search</Button>
          </Form>
          </Card.ImgOverlay>
        </Card>
        <h1 style={{marginTop: '50px', textAlign: 'center'}}>Popular Activities & Things To Do</h1>
        <ToursList/>
      </div>
    )
  }
}

export default Home
