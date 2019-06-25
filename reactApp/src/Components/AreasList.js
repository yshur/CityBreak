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
		this.save = this.save.bind(this)
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
	 save(e) {
			e.preventDefault()
			this.props.onChange(this.props.index)
			// alert(this.newIdea.value)
			console.log('saving')
			this.setState({
				editing: false
			})

			console.log(`editing = ${this.state.editing}`)
		}
		eachArea(Area, i) {
			console.log(Area)
			return (
					<option onClick={this.save} key={Area} index={i}>{Area}</option>
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
