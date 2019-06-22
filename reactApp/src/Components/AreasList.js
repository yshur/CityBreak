import React, { Component } from 'react'
import {Card, CardGroup} from 'react-bootstrap';
import {Form, FormControl, Button,ButtonToolbar,Col } from 'react-bootstrap';

class AreasList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			areas: ["Choose "+this.props.index+"s"]
		}
		console.log(this.props);

		this.eachArea = this.eachArea.bind(this)
		this.add = this.add.bind(this)
	}
	componentDidMount() {
		 const url = "http://localhost:3000/get"+this.props.index+"s";
		 console.log(url);
		 fetch(url)
		 	.then((res) => {
		 		return res.json();
		 	})
		 	.then((data) => {
		 		var self=this;
		 		data.map((data) => {
		 			console.log(data)
		 			self.add(data);
		 		})
			 })
	 }
	eachArea(Area, i) {
		console.log(Area)
		return (
				<option key={Area} index={i}>{Area}</option>
		)
	}
	add(name) {

		this.setState(prevState => ({
			areas: [
				...prevState.areas,
					name
				]
		}))
	}

	render() {
		return (
			<Form.Control as="select" style={{margin:'10px'}}>
				{this.state.areas.map(this.eachArea)}
			</Form.Control>
		)
	}
}

export default AreasList
