import React, { Component } from 'react'
import {Card} from 'react-bootstrap';


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
					<Card style={{border:'none'}}>
						<div>{this.props.children}</div>
					</Card>
				</div>
		)
	}
}

export default Tour
