import React, { Component } from 'react'
import Header from "./Header";
import ToursList from "./ToursList";
import {Card} from 'react-bootstrap';
import {Row, Col,Container} from 'react-bootstrap';
// import Alert from "./Alert";

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
  }
}
  render(){
    const bgStyle = {
			width:"300px",
			height:"200px",
      backgroundImage: 'url(https://cdn.getyourguide.com/img/country_img-8-66634308-88.jpg)'
		}
    return(
      <div>
        <Header/>
        <b>Hi {this.props.location.state.name} </b>
        <Card>
          <Card.Body style = {{backgroundImage: 'url(https://cdn.getyourguide.com/img/country_img-8-66634308-88.jpg)',backgroundSize:"100% ", height:'400px'}}>
          <Card.Title style={{color:'white',fontWeight: 'bold',fontSize: '45px',marginRight: '80px', marginTop:'80px', textAlign: 'right'}}> המסלולים הטובים ביותר של </Card.Title>
          <Card.Text style={{color:'white',fontWeight: 'bold',fontSize: '120px',marginRight: '80px', marginTop: '-35px', textAlign: 'right'}}>ישראל</Card.Text>
          </Card.Body>
        </Card>
        <Container style={{height: '100px', backgroundColor:'blue', margin:'20px'}}>
          <Row>
            <Col>1 of 2</Col>
            <Col>2 of 2</Col>
          </Row>
        </Container>
		    <ToursList/>
      </div>
    )
  }
}

export default Home
