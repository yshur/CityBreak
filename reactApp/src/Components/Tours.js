import React, { Component } from 'react'
import Tour from './Tour'
import axios from 'axios'

class ToursDemo extends Component {
	numFor_id = 4;
	constructor(props) {
		super(props)
		this.state = {
			Tours: []
		}
		this.eachTour = this.eachTour.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
		this.add = this.add.bind(this)
		// this.next_id = this.next_id.bind(this)
	}

	componentDidMount() {
		var url = this.props.url;
		console.log(url)
		console.log(this.props.method)
		if(this.props.method === 'get') {
			axios.get(url)
				.then((res) => {
					console.log(res)
					var self=this;
					res.data.map((Tour) => {
	            		console.log(Tour)
	            		self.add(Tour._id, Tour.creator, Tour.category,
                    Tour.timeCreated, Tour.equipment, Tour.chat,
                    Tour.name, Tour.description, Tour.time,
                    Tour.place, Tour.participants, Tour.required_equipment, Tour.image
                  );
						})
			 })
		} else if (this.props.method === 'post') {
			var params = this.props.params
			console.log(params)
			axios.post(url, {
			    params
			})
			.then((res) => {
					console.log(res)
					var self=this;
					res.data.map((Tour) => {
							console.log(Tour)
							self.add(Tour._id, Tour.creator, Tour.category,
								Tour.timeCreated, Tour.equipment, Tour.chat,
								Tour.name, Tour.description, Tour.time,
								Tour.place, Tour.participants, Tour.required_equipment, Tour.image
	        		)
			 })
		})
	}
}


	eachTour(Tour, i) {
		// console.log(Tour)
		return (
			<div className="card">
				<div className="card-body" style= {{padding: "10px"}}>

					<Tour key={Tour._id} index={Tour._id} Tour={Tour}
						method={this.props.method}
						onChange={this.update}
						onDelete={this.delete}>

						<section className= "imgLeft" style={{float:"left", width:"100px", height: "100px"}}>
						<img className="card-img-top" src={Tour.image}  alt="Card cap" style={{padding:"5px"}}/>
						</section>
						<h5 className="card-title" style={{marginTop: "15px", marginBottom:"0px", fontFamily: 'Love Ya Like A Sister', fontWeight: "bold"}}>{Tour.name}</h5>
						<p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}>{Tour.description}</p>
						<p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}><b>Time:</b> {Tour.time}</p>
						<p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}><b>Place:</b> {Tour.place}</p>
					</Tour>

				</div>
				<div className="footer">
					<p style={{marginTop: "20px"}}> &copy; All right reserved to Roi Shmueli & Yair Shur</p>
				</div>
			</div>
		)
	}
	update(newTour, i) {
		console.log('update: '+i+' '+newTour)
		this.setState(prevState => ({
			Tours: prevState.Tours.map(
				Tour => (Tour._id !== i) ? Tour : {...Tour,name:newTour}
			)
		}))
	}
	delete(_id) {
		console.log('deleted: '+_id)
		this.setState(prevState => ({
			Tours: prevState.Tours.filter(Tour => Tour._id !== _id)
		}))
	}
	add(_id, creator, category, timeCreated, equipment, chat,
    name, description, time, place, participants, required_equipment, image) {

		this.setState(prevState => ({
			Tours: [
				...prevState.Tours,
				{
					_id:_id,
					creator: creator,
					category: category,
					timeCreated: timeCreated,
					equipment: equipment,
					chat: chat,
          name:name,
          description: description,
          time: time,
          image: image,
          place: place,
          participants: participants,
          required_equipment: required_equipment
  			}]
		}))

	}

	render() {
		console.log(this.state.Tours);
		return (
            <div>
                <h4 style={{fontFamily: 'Love Ya Like A Sister'}}> Tours List </h4>
							 <div className="card ToursList" style= {{border: "0px "}}>
							 		{this.state.Tours.map(this.eachTour)}
								<br/>
							</div>
        </div>
		)

	}
}

export default ToursDemo
