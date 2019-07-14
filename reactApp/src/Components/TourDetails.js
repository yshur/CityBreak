import React, { Component } from 'react'
import {Card, CardGroup} from 'react-bootstrap';
import TourPointItem from './TourPointItem';
import Header from "./Header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Iframe from 'react-iframe'

class TourDetails extends Component {

	constructor(props) {
		super(props)
		this.state = {
			 tour: this.props.location.state.tour,
			 details: false
		}
		this.eachPoint = this.eachPoint.bind(this)
		this.getMap = this.getMap.bind(this);
	}
	getMap(){
		const url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCmaNR4ecZxT5KTRxh2JVV0uQDl5nbgH-k&q="+this.state.point.latitude+","+this.state.point.longitude
		if(this.state.point.longitude) {
			return (
				<Iframe width='600' height='450' frameborder='0' style={{border:0}}
					url={url}	allowfullscreen />
			)
		}
	}
	eachPoint(point, i) {
		return (
			<div key={point._id+i} index={i} >
				<CardGroup style={{display:'block'}}>
					<TourPointItem point_id={point.point} />
				</CardGroup>
			</div>
		)
	}
	componentDidMount() {
		 const url = "http://localhost:3000/getTour/"+this.state.tour._id;
		 console.log(url)
		 fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				this.setState({
					tour:data,
					details: true
				});
			})
	 }
	render(){
		return(
			<div>
				<Header/>
				<div className='tour'>
					<h1 style={{ color: '#1F4788', fontFamily: 'Raleway,sans-serif', fontSize: '62px', fontWeight: '800', lineHeight: '72px', margin: '0 0 24px', textAlign: 'center', textTransform: 'uppercase',paddingTop:'50px'}}>Your tour </h1>
					<Card>
						<Card.Body>
							<div>
								<Card.Title style={{marginLeft:'25%',marginBottom:'60px', width:"100%",height:"240px",backgroundRepeat:"no-repeat", backgroundImage:`url(${this.state.details ? this.state.tour.image_url : ''})`}}></Card.Title>
								<p style={{fontSize:'24px', marginTop:'-50px', fontWeight:'bold'}}>{this.state.details ? this.state.tour.name : ''}</p>
							</div>
							<div style={{marginLeft:'24%', fontWeight:'bold',fontSize:'24px', color:'#4B77BE'}}>
								<Card.Text style={{display:'inline',margin:'2%'}}>Area: {this.state.details ? this.state.tour.area : '' }</Card.Text>
								<Card.Text style={{display:'inline',margin:'2%'}}>Sub Area: {this.state.details ? this.state.tour.sub_area : '' }</Card.Text>
								<Card.Text style={{display:'inline',margin:'2%'}}>Distance: {this.state.details ? this.state.tour.distance : '' } KM</Card.Text>
								<Card.Text style={{margin:'2%'}}>Tags: {this.state.details ? this.state.tour.tags : '' }</Card.Text>
							</div>
						</Card.Body>
						<Card.Footer style={{width:'100%'}}>
							<strong className="text-muted" style={{fontSize:'24px',marginLeft:'39%'}}>Tour duration: {this.state.details ? this.state.tour.duration : ''} min</strong>
						</Card.Footer>
				  </Card>
				  <br />
					<div>
						{this.state.details ? this.state.tour.points_list.map(this.eachPoint) : ''}
					</div>
				</div>
				<Link to='/tours'>
					<button className="btn btn-primary" >Close</button>
				</Link>
			</div>
		)
	}
}

export default TourDetails
