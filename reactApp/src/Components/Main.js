import React, { Component } from 'react'
import Header from "./Header";
import ToursList from "./ToursList";
import mainImg from "./ban1.jpg"
import {Card} from 'react-bootstrap';
import {Form, FormControl, Button,ButtonToolbar } from 'react-bootstrap';


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
        <Card className="bg-dark text-white" style={{border:'none', marginTop:'10px'}}>
          <Card.Img src={mainImg} style={{height:'400px'}} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title style={{color:'black',fontSize:'56px', textAlign:'center', marginTop:'7%'}}>What's your destenation ?</Card.Title>
          <Form inline style={{marginLeft:'28%', marginTop:'20px'}}>
            <FormControl type="text" placeholder="City, Region or Country" className="mr-sm-2" style={{width: '45%'}}/>
            <Button variant="outline-light" style={{width:'15%', background:'#4B77BE'}}>Search</Button>
          </Form>
          </Card.ImgOverlay>
        </Card>
        <h1 style={{marginTop: '50px', textAlign: 'center'}}>Popular Activities & Things To Do</h1>
        <ToursList/>
        <ButtonToolbar style={{width:'60%'}}>
          <Button active style={{background:'white', color:'black', background: '#89C4F4',border:'none' , marginLeft:'8.7%',marginTop:'40px', fontWeight:'bold'}}>
            Show all tours
          </Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Home
