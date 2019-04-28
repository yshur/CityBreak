import React, { Component } from 'react'
import {Card} from 'react-bootstrap';


class Track extends Component {

	constructor(props) {
		super(props)
		this.state = {
			editing: false
		}
	}
	render(){
		return(
				<div className='Track'>

					<Card>
						<div>{this.props.children}</div>
					</Card>
				</div>
		)
	}
}

export default Track
