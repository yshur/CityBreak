import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
import PointDetails from './PointDetails';

class PointItemList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			point: null,
			point_id: this.props.point_id
		}
		this.openItem = this.openItem.bind(this);
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
	openItem() {
		this.setState({item: false})
	}
	renderItem(){
		return(
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
		)
	}
	renderDetails() {
		return (
			<div>
				<PointDetails point={this.state.point ? this.state.point : ''} />
			</div>
		)
	}
	render() {
		return this.renderItem()
	}
}

export default PointItemList
