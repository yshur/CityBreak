import React, { Component } from 'react'
import TourItem from './TourItem'
import {CardGroup} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ToursList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tours: []
		}
		this.eachTour = this.eachTour.bind(this)
		this.add = this.add.bind(this)
	}
	componentDidMount() {
		 const url = "https://citybreakshenkar.herokuapp.com/getTours?"+(this.props.params ? this.props.params : 'limit=3');
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
		const url = "https://citybreakshenkar.herokuapp.com/getTours?"+(this.props.params ? this.props.params : 'limit=3');
		console.log(url)
		fetch(url)
		 .then((res) => {
			 return res.json();
		 })
		 .then((data) => {
			 var self=this;
			 this.setState({tours: []});
			 data.map((data) => {
				 // console.log(data)
				 self.add(data._id, data.area, data.name,data.about,data.image_url);
			 })
			})
	}
	eachTour(tour, i) {
		return (
			<div key={tour._id+i} index={i} >
				<CardGroup style={{display:'block', marginLeft:'4%'}}>
					<Link to={{
							pathname: '/tours/'+tour._id,
							state: {
								tour: tour
							}
						}}>
					  <TourItem tour={tour} />
					</Link>
				</CardGroup>
			</div>
		)
	}
	add(_id, area, name, about, image_url) {
		// console.log(image_url)
		this.setState(prevState => ({
			tours: [
				...prevState.tours,
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
		 			{this.state.tours.map(this.eachTour)}
				</div>
		)
	}
}

export default ToursList
