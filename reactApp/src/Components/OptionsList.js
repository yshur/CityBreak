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
		this.renderOneOptionList = this.renderOneOptionList.bind(this)
		this.renderMultipleOptionList = this.renderMultipleOptionList.bind(this)
	}
	handleChange(e) {
		if(this.props.index=='tag') {
			var options = e.target.options;
			var value = [];
			for (var i = 0, l = options.length; i < l; i++) {
				if (options[i].selected) {
					value.push(options[i].value);
				}
			}
			this.props.onChange(this.props.index, value);
		} else {
			console.log("OptionsList: handleChange - " +this.props.index+"="+e.target.value);
			this.props.onChange(this.props.index, e.target.value);
		}
		e.preventDefault();
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
	renderOneOptionList() {
		return (
			<Form.Control as="select" class="custom-select" onChange={this.handleChange} style={{margin:'10px'}}>
				<option key={this.props.index} index={this.props.index}>Choose {this.props.index}</option>
				{this.state.options.map(this.eachOption)}
			</Form.Control>
		)
	}
	renderMultipleOptionList() {
		return (
			<div class="row">
			  <div class="col-md-12">
			    <select class="mdb-select colorful-select dropdown-primary md-form" searchable="Search here..">
			      <option value="" disabled selected>Choose your {this.props.index}s</option>
						{this.state.options.map(this.eachOption)}
			    </select>
			    <button class="btn-save btn btn-primary btn-sm" onClick={this.handleChange} >Save</button>
			  </div>
			</div>
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
