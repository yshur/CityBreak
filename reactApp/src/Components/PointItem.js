import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PointItem extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.save = this.save.bind(this)
	}
	save(e) {
		e.preventDefault()
		if(this.props.onSubmit) {
			this.props.onSubmit(this.props.point._id)
		}
	}
	render(){
		if(this.props.tour === null || this.props.tour === undefined) {
			return(
					<div className='point'>
						<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"450px",float:"left", margin:'15px', border:'none'}}>
							<Card.Body style={{background:'#F2F1EF'}}>
							<Link to={{
									pathname: '/points/'+this.props.point._id,
									state: {
										point: this.props.point
									}
								}}>
								<div>
									<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.props.point.image_url[0]})`}}></Card.Title>
									<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.props.point.name}</p>
								</div>
								</Link>
								<Card.Text style={{color:'black'}}>Area: {this.props.point.area}</Card.Text>
								<Card.Text style={{color:'black'}}>About: {this.props.point.about}</Card.Text>
							</Card.Body>
						</Card>
					</div>
			)
		} else {
			return(
					<div className='point'>
						<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"450px",float:"left", margin:'15px', border:'none'}}>
							<Card.Body style={{background:'#F2F1EF'}}>
							<Link to={{
									pathname: '/points/'+this.props.point._id,
									state: {
										point: this.props.point
									}
								}}>
								<div>
									<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.props.point.image_url[0]})`}}></Card.Title>
									<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.props.point.name}</p>
								</div>
								</Link>
								<Card.Text style={{color:'black'}}>Area: {this.props.point.area}</Card.Text>
								<Card.Text style={{color:'black'}}>About: {this.props.point.about}</Card.Text>
								<button className="btn btn-primary" style={{width:'100%', marginTop:'1%'}} onClick={this.save}>Add</button>
							</Card.Body>
						</Card>
					</div>
			)
		}
	}
}

export default PointItem
