import React, { Component } from 'react'
import {Card} from 'react-bootstrap';

class AddPointItem extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tourPage: false
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
					<Card style={{ boxShadow: '5px 10px 18px #888888', maxWidth:"360px",marginTop:'5%',float:"left", border:'none', marginLeft:'1.5%'}}>
					<Card.Title style={{width:"100%",height:"240px", backgroundImage:`url(${this.props.point.image_url[0]})`}}></Card.Title>
							<p style={{fontSize:'24px', marginTop:'-65px', color:'white', fontWeight:'bold', textAlign:'center'}}>{this.props.point.name}</p>
						<Card.Body style={{background:'#F2F1EF'}}>

								<Card.Text style={{height:'20px'}}>About: {this.props.point.about}</Card.Text>
								<button className="btn btn-primary" style={{background: 'rgb(242, 241, 239)', marginTop:'6%',border: 'none',color: 'blue',marginLeft: '-12px'}}onClick={this.openItem}>Read more</button>
								<Card.Text >Area: {this.props.point.area}</Card.Text>
								<Card.Text >Duration: {this.props.point.duration}</Card.Text>
							<button className="btn btn-primary" style={{width:'100%', marginTop:'1%'}}onClick={this.save}>Add</button>
						</Card.Body>
					</Card>
				</div>
		)
	}
}

export default AddPointItem
