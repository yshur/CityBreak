import React, { Component } from 'react'
import PointItem from './PointItem'
import {CardGroup} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
	}
	componentDidMount() {
		 const url = "https://citybreakshenkar.herokuapp.com/getPoints?"+(this.props.params ? this.props.params : 'limit=6');
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
			const url = "https://citybreakshenkar.herokuapp.com/getPoints?"+(this.props.params ? this.props.params : 'limit=6');
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
					<Link to={{
						  pathname: '/points/'+point._id,
						  state: {
						    point: point
						  }
						}}>
					  <PointItem onChange={this.openDetails} point={point} />
					</Link>
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
	render() {
		return (
				<div>
					{this.state.points.map(this.eachPoint)}
				</div>
		)
	}
}

export default PointsList
