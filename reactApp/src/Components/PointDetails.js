import React, { Component } from 'react'
import {Card} from 'react-bootstrap';


class PointDetails extends Component {

	constructor(props) {
		super(props)
		this.state = {
			point: this.props.point
		}
	}
	componentDidMount() {
		 const url = "http://localhost:3000/getPoint/"+this.props.point._id;
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
				<div className='point'>
					<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", margin:'15px', border:'none'}}>
						<Card.Body style={{background:'#F2F1EF'}}>
							<div>
								<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.props.point.image_url[0]})`}}></Card.Title>
								<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.state.point.name}</p>
							</div>
							<Card.Text style={{color:'black'}}>Area: {this.state.point.area}</Card.Text>
							<Card.Text style={{color:'black'}}>Sub Area: {this.state.point.sub_area}</Card.Text>
							<Card.Text style={{color:'black'}}>About: {this.state.point.about}</Card.Text>
							<Card.Text style={{color:'black'}}>Reference Url: <a href={this.state.point.reference_url}>{this.state.point.name}</a></Card.Text>
							<Card.Text style={{color:'black'}}>Tags: {this.state.point.tags}</Card.Text>
						</Card.Body>
						<Card.Footer style={{width:'365px'}}>
							<small className="text-muted">Duration: {this.state.point.duration}</small>
						</Card.Footer>
					</Card>
					<Card>
						<Card.Body style={{background:'#F2F1EF'}}>
							<Card.Text>Description: {this.state.point.description}</Card.Text>
						</Card.Body>
					</Card>
				</div>
		)
	}
}

export default PointDetails
