import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
import PointDetails from './PointDetails';

class PointItem extends Component {

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
	renderItem(){
		return(
				<div className='point'>
					<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", margin:'15px', border:'none'}}>
						<Card.Body style={{background:'#F2F1EF'}}>
							<div>
								<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.props.point.image_url[0]})`}}></Card.Title>
								<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.props.point.name}</p>
							</div>
							<Card.Text style={{color:'black'}}>Area: {this.props.point.area}</Card.Text>
							<Card.Text style={{color:'black'}}>About: {this.props.point.about}</Card.Text>
						</Card.Body>
						<Card.Footer style={{width:'365px'}}>
							<small className="text-muted">Duration:</small>
							<button className="btn btn-primary" onClick={this.openItem}>Open</button>
						</Card.Footer>
					</Card>
				</div>
		)
	}
	renderDetails() {
		return (
			<div>
				<PointDetails point={this.props.point} />
			</div>
		)
	}
	render() {
		return this.state.item ? this.renderItem() : this.renderDetails()
	}
}

export default PointItem
