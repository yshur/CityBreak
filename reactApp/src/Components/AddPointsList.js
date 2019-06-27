import React, { Component } from 'react'
import PointItem from './PointItem'
import {Card, CardGroup} from 'react-bootstrap';

class AddPointsList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			points: []
		}
		this.eachPoint = this.eachPoint.bind(this)
		this.add = this.add.bind(this)
		this.save = this.save.bind(this)
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
			<div key={point._id+i} index={point._id} >
				<CardGroup style={{display:'block', marginLeft:'4%'}}>
				  <PointItem point={point}>
					</PointItem>
					<button className="btn btn-primary" onClick={this.save}>Add</button>
				</CardGroup>
			</div>
		)
	}
	save(e,index) {
		e.preventDefault()
		this.props.onChange(index)
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

export default AddPointsList
