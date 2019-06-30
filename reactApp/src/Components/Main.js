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
  this.routeChange = this.routeChange.bind(this);
}
  routeChange(event, path) {
      this.props.history.push(path);
    }
  render(){
    return(
      <div>
        <Header/>
        <Card className="bg-dark text-white" style={{border:'none', marginTop:'10px'}}>
          <Card.Img src={mainImg} style={{height:'400px'}} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title style={{color:'white',textShadow:'2px 2px #002266',fontSize:'56px', textAlign:'center', marginTop:'7%'}}>What's your destenation ?</Card.Title>
          <Form inline style={{marginLeft:'28%', marginTop:'20px'}}>
            <FormControl type="text" placeholder="City, Region or Country" className="mr-sm-2" style={{width: '45%'}}/>
            <Button variant="outline-light" style={{width:'15%', background:'#19B5FE'}}>Search</Button>
          </Form>
          </Card.ImgOverlay>
        </Card>
        <ButtonToolbar style={{marginTop:'3%'}}>
          <Button onClick= {(e) => {this.routeChange(e, 'alltours')}} variant="outline-light" style={{ background:'#19B5FE', marginLeft:'10%',height:'60px',width: '20%', fontSize: '20px'}}>Get all tours</Button>
          <Button onClick= {(e) => {this.routeChange(e, 'createtour')}} variant="outline-light" style={{ background:'#19B5FE', marginLeft:'10%',height:'60px',width: '20%', fontSize: '20px'}}>Build tour</Button>
          <Button onClick= {(e) => {this.routeChange(e, 'signinadmin')}} variant="outline-light" style={{ background:'#19B5FE', marginLeft:'10%',height:'60px',width: '20%', fontSize: '20px'}}>xxx</Button>
        </ButtonToolbar>
        <h1 style={{marginTop: '50px', textAlign: 'center', color:'rgb(31, 71, 136)'}}>Popular Activities & Things To Do</h1>
        <ToursList/>
      </div>
    )
  }
}

export default Home
