import React, { Component } from 'react'
import PointItem from './PointItem'
import {Card, CardGroup} from 'react-bootstrap';
import PointDetails from './PointDetails';

class PointsList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			details: false,
			point: null,
			points: []
		}
		this.eachPoint = this.eachPoint.bind(this)
		this.add = this.add.bind(this)
		this.openDetails = this.openDetails.bind(this)
		this.renderList = this.renderList.bind(this)
		this.renderDetails = this.renderDetails.bind(this)
		this.closeDetails = this.closeDetails.bind(this)

	}
	componentDidMount() {
		 const url = "http://localhost:3000/getPoints?"+(this.props.params ? this.props.params : 'limit=6');
		 console.log(url)
		 fetch(url)
		 	.then((res) => {
		 		return res.json();
		 	})
		 	.then((data) => {
		 		var self=this;
		 		data.map((data) => {
		 			// console.log(data)
		 			self.add(data._id, data.area, data.name,data.about,data.image_url);
		 		})
			 })
	 }
	componentWillReceiveProps() {
			const url = "http://localhost:3000/getPoints?"+(this.props.params ? this.props.params : 'limit=6');
			console.log(url)
			fetch(url)
			 .then((res) => {
				 return res.json();
			 })
			 .then((data) => {
				 var self=this;
				 this.setState({points: []});
				 data.map((data) => {
					 // console.log(data)
					 self.add(data._id, data.area, data.name,data.about,data.image_url);
				 })
				})
		}
	eachPoint(point, i) {
		return (
			<div key={point._id+i} index={i} >
				<CardGroup style={{display:'block'}}>
				  <PointItem onChange={this.openDetails} point={point}>
					</PointItem>
				</CardGroup>
			</div>
		)
	}
	add(_id, area, name, about, image_url) {
		// console.log(image_url)
		this.setState(prevState => ({
			points: [
				...prevState.points,
				{
					_id:_id,
					area:area,
					name:name,
					about:about,
					image_url:image_url
				}]
		}))
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
	renderList() {
		return (
				<div>
					{this.state.points.map(this.eachPoint)}
				</div>
		)
	}
	renderDetails(){
		return (
			<div>
				<PointDetails onChange={this.closeDetails} point={this.state.point} />
			</div>
		)
	}

	render() {
		return this.state.details ? this.renderDetails() : this.renderList()
	}
}

export default PointsList
