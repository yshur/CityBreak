import React, { Component } from 'react'
import {Form} from 'react-bootstrap';

class OptionsList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			options: [],
			value: ""
		}
		console.log(this.props);
		this.handleChange = this.handleChange.bind(this);
		this.eachOption = this.eachOption.bind(this)
		this.add = this.add.bind(this)
	}
	handleChange(event) {
		console.log("OptionsList: handleChange - " +this.props.index+"="+event.target.value);
		this.props.onChange(event, this.props.index);
		event.persist();
	}
	componentDidMount() {
		 const url = "https://citybreakshenkar.herokuapp.com//get"+this.props.index+"s";
		 console.log(url);
		 fetch(url)
		 	.then((res) => {
		 		return res.json();
		 	})
		 	.then((data) => {
		 		var self=this;
		 		data.map((data) => {
		 			// console.log(data)
		 			self.add(data);
		 		})
			 })
	 }

	eachOption(Option, i) {
		// console.log(Option)
		return (
				<option key={Option} index={i}>{Option}</option>
		)
	}
	add(name) {

		this.setState(prevState => ({
			options: [
				...prevState.options,
					name
				]
		}))
	}

	render() {
		return (
			<Form.Control as="select" onChange={this.handleChange} style={{margin:'10px'}}>
				<option key={this.props.index} index={this.props.index}>Choose {this.props.index}</option>
				{this.state.options.map(this.eachOption)}
			</Form.Control>
		)
	}
}

export default OptionsList
