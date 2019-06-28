import React, { Component } from 'react'
import {Card} from 'react-bootstrap';


class AddPointItem extends Component {

	constructor(props) {
		super(props)
		this.state = {
		}
		this.save = this.save.bind(this)
		this.openItem = this.openItem.bind(this);
	}
	save(e) {
		e.preventDefault()
		this.props.onSubmit(this.props.point._id)
	}
	openItem(e) {
		e.preventDefault()
		this.props.onChange(this.props.point)
	}
	render(){
		return(
				<div className='point'>
					<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"365px",maxHeight:"380px",float:"left", marginTop:'10%', border:'none', marginLeft:'1%'}}>
						<Card.Body style={{background:'#F2F1EF'}}>
							<div>
								<Card.Title style={{marginLeft:'-12px',color:'black', width:"350px",height:"240px", backgroundImage:`url(${this.props.point.image_url[0]})`}}></Card.Title>
								<p style={{fontSize:'24px', marginTop:'-50px', color:'black', fontWeight:'bold'}}>{this.props.point.name}</p>
							</div>
							<Card.Text style={{color:'black'}}>Area: {this.props.point.area}</Card.Text>
							<Card.Text style={{color:'black', height:'20px'}}>About: {this.props.point.about}</Card.Text>
							<small className="text-muted">Duration:</small>
              <button className="btn btn-primary" style={{width:'100%', marginTop:'1%'}}onClick={this.openItem}>Open</button>
							<button className="btn btn-primary" style={{width:'100%', marginTop:'1%'}}onClick={this.save}>Add</button>
						</Card.Body>
					</Card>
				</div>
		)
	}
}

export default AddPointItem
