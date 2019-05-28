import React, { Component } from 'react'

class Tour extends Component {

	constructor(props) { 
		super(props)
		this.state = {
			editing: false
		}
	}
	render(){
		return(
				<div className='tour'>
				<div className="card-body">
					<div>{this.props.children}</div>			
					</div>
				</div>	
		)
	}
}

export default Tour
