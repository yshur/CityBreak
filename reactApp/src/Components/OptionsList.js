import React, { Component } from 'react'
import {Form} from 'react-bootstrap';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

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
		this.renderOneOptionList = this.renderOneOptionList.bind(this)
		this.renderMultipleOptionList = this.renderMultipleOptionList.bind(this)
	}
	handleChange(e) {
		console.log(e);
		if(this.props.index=='tag') {
			var options = e;
			var value = [];
			for (var i = 0, l = options.length; i < l; i++) {
				value.push(options[i].value);
			}
			this.props.onChange(this.props.index, value);
		} else {
			console.log("OptionsList: handleChange - " +this.props.index+"="+e.target.value);
			this.props.onChange(this.props.index, e.target.value);
			e.preventDefault();
		}
	}
	componentDidMount() {
		 const url = "https://citybreakshenkar.herokuapp.com/get"+this.props.index+"s";
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
		return (
				<option key={Option} index={i}>{Option}</option>
		)
	}
	add(name) {
		if(this.props.index!=='tag') {
			this.setState(prevState => ({
				options: [
					...prevState.options,
						name
					]
			}))
		} else {
			this.setState(prevState => ({
				options: [
					...prevState.options,
						{label: name, value: name }
					]
			}))
		}
	}
	renderOneOptionList() {
		return (
			<Form.Control as="select" className="custom-select" onChange={this.handleChange} >
				<option key={this.props.index} index={this.props.index}>Choose {this.props.index}</option>
				{this.state.options.map(this.eachOption)}
			</Form.Control>
		)
	}
	renderMultipleOptionList() {
		return (
				<ReactMultiSelectCheckboxes placeholderButtonLabel="Choose Categories from List..." className="custom-select" options={this.state.options} onChange={this.handleChange} />
		)
	}
	render() {
		if(this.props.index=='tag') {
			return this.renderMultipleOptionList();
		} else {
			return this.renderOneOptionList();
		}
	}
}

export default OptionsList
