import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TourPointItem extends Component {

	constructor(props) {
		super(props)
		this.state = {
			point: null,
			point_id: this.props.point_id
		}
	}
	componentDidMount() {
		 const url = "https://citybreakshenkar.herokuapp.com/getPoint/"+this.state.point_id;
		 console.log(url)
		 fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				this.setState({point:data});
			})
	 }
	render(){
		return(
			<div>
				<Link to={{
						pathname: this.state.point ? '/points/'+this.state.point._id : '#',
						state: {
							point: this.state.point
						}
					}}>
					<div className='point'>
						<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", margin:'15px', border:'none'}}>
							<Card.Body style={{background:'#F2F1EF'}}>
								<div>
									<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.state.point ? this.state.point.image_url[0] : ''})`}}></Card.Title>
									<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.state.point ? this.state.point.name : '' }</p>
								</div>
								<Card.Text style={{color:'black'}}>Area: {this.state.point ? this.state.point.area : '' }</Card.Text>
								<Card.Text style={{color:'black'}}>About: {this.state.point ? this.state.point.about : '' }</Card.Text>
							</Card.Body>
						</Card>
					</div>
				</Link>
			</div>
		)
	}
}

export default TourPointItem
