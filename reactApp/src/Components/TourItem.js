import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
import TourDetails from './TourDetails';


class TourItem extends Component {

	constructor(props) {
		super(props)
		this.state = {
				item: true
		}
		this.openItem = this.openItem.bind(this);
	}
	openItem() {
		this.setState({item: false})

	}
	render(){
		return(
				<div className='tour'>
					<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", margin:'15px', border:'none'}}>
						<Card.Body style={{background:'#F2F1EF'}}>
							<div>
								<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.props.tour.image_url})`}}></Card.Title>
								<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.props.tour.name}</p>
							</div>
							<Card.Text style={{color:'black'}}>Area: {this.props.tour.area}</Card.Text>
							<Card.Text style={{color:'black'}}>About: {this.props.tour.about}</Card.Text>
						</Card.Body>
						<Card.Footer style={{width:'365px'}}>
							<small className="text-muted">Duration:</small>
							<button className="btn btn-primary" onClick={this.openItem}>Open</button>

						</Card.Footer>
					</Card>
				</div>
		)
	}
}

export default TourItem
