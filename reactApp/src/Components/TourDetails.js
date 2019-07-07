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
		 const url = "https://citybreakshenkar.herokuapp.com/getTour/"+this.state.tour._id;
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
				<Header />
				<div className='tour'>
					<h1 style={{textAlign:'center', margin:'30px', color:'#1F4788'}}> Your tour is ready </h1>
					<Link to='/tours'>
						<button className="btn btn-primary" >Close</button>
					</Link>
					<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", marginTop:'90px', border:'none'}}>
						<Card.Body style={{background:'#F2F1EF'}}>
							<div>
								<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.state.details ? this.state.tour.image_url : ''})`}}></Card.Title>
								<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.state.details ? this.state.tour.name : ''}</p>
							</div>
							<h3 style={{marginTop:'60px'}}>Tour details </h3>
							<Card.Text style={{color:'black'}}>Area: {this.state.details ? this.state.tour.area : '' }</Card.Text>
							<Card.Text style={{color:'black'}}>Sub Area: {this.state.details ? this.state.tour.sub_area : '' }</Card.Text>
							<Card.Text style={{color:'black'}}>About: {this.state.details ? this.state.tour.about : '' }</Card.Text>
							<Card.Text style={{color:'black'}}>Distance: {this.state.details ? this.state.tour.distance : '' } KM</Card.Text>
							<Card.Text style={{color:'black'}}>Tags: {this.state.details ? this.state.tour.tags : '' }</Card.Text>
						</Card.Body>
						<Card.Footer style={{width:'365px'}}>
							<strong className="text-muted" style={{fontSize:'24px'}}>Tour duration: {this.state.details ? this.state.tour.duration : ''} min</strong>
						</Card.Footer>
					</Card>
					<div>
						{this.state.details ? this.state.tour.points_list.map(this.eachPoint) : ''}
					</div>
				</div>
			</div>
		)
	}
}

export default TourDetails
