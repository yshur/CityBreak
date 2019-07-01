import React, { Component } from 'react'
import {Card, CardGroup} from 'react-bootstrap';
import PointItemList from './PointItemList';

class tourPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			 tour_id: this.props.location.state.tour_id,
			 tour: null
		}
		this.eachPoint = this.eachPoint.bind(this)
	this.openDetails = this.openDetails.bind(this)
	this.closeDetails = this.closeDetails.bind(this)
	}
	openDetails(point){
		console.log(point);
		this.setState({
			point: point,
			details: true
		});
	}
	closeDetails(){
		this.setState({
			details: false
		});
	}
	eachPoint(point, i) {
		return (
			<div key={point._id+i} index={i} >
				<CardGroup style={{display:'block'}}>
				  <PointItemList onChange={this.openDetails} point_id={point.point}>
					</PointItemList>
				</CardGroup>
			</div>
		)
	}
	componentDidMount() {
		 const url = "http://localhost:3000/getTour/"+this.state.tour_id;
		 console.log(url)
		 fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				this.setState({tour:data});
				})
	 }
	render(){
		return(
				<div className='tour'>
					<h1 style={{textAlign:'center', margin:'30px', color:'#1F4788'}}> Your tour is ready </h1>

					<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", marginTop:'90px', border:'none'}}>
						<Card.Body style={{background:'#F2F1EF'}}>
							<div>
								<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.state.tour ? this.state.tour.image_url : ''})`}}></Card.Title>
								<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.state.tour ? this.state.tour.name : ''}</p>
							</div>
							<h3 style={{marginTop:'60px'}}>Tour details </h3>
							<Card.Text style={{color:'black'}}>Area: {this.state.tour ? this.state.tour.area : '' }</Card.Text>
							<Card.Text style={{color:'black'}}>Sub Area: {this.state.tour ? this.state.tour.sub_area : '' }</Card.Text>
							<Card.Text style={{color:'black'}}>About: {this.state.tour ? this.state.tour.about : '' }</Card.Text>
							<Card.Text style={{color:'black'}}>Distance: {this.state.tour ? this.state.tour.distance : '' } KM</Card.Text>
							<Card.Text style={{color:'black'}}>Tags: {this.state.tour ? this.state.tour.tags : '' }</Card.Text>
						</Card.Body>
						<Card.Footer style={{width:'365px'}}>
							<strong className="text-muted" style={{fontSize:'24px'}}>Tour duration: {this.state.tour ? this.state.tour.duration : ''} min</strong>

						</Card.Footer>
					</Card>

					<div>
						{this.state.tour ? this.state.tour.points_list.map(this.eachPoint) : ''}
					</div>
				</div>
		)
	}
}

export default tourPage
