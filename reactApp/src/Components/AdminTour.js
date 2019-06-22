import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
import { IoIosTrash } from "react-icons/io";


class AdminTour extends Component {

	constructor(props) {
		super(props)
		this.state = {
			editing: false
		}
		this.delete = this.delete.bind(this)
	}
	delete() {
		// alert('delete it')
		console.log('deleting')
		this.props.onDelete(this.props.index)
	}
	render(){
		return(
				<div className='AdminTour'>
					<Card>
						<div>{this.props.children}</div>
						<span>
							<button className="btn btn-primary" onClick={this.delete}>Delete <IoIosTrash/></button>
						</span>
					</Card>
				</div>
		)
	}
}

export default AdminTour
