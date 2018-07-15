import React, { Component } from 'react'
import EventItem from './EventItem'
import axios from 'axios'

class EventsList extends Component {
	numFor_id = 4;
	constructor(props) {
		super(props)
		this.state = {
			Events: []
		}
		this.eachEvent = this.eachEvent.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
		this.add = this.add.bind(this)
		// this.next_id = this.next_id.bind(this)
	}

	componentDidMount() {
		var url = this.props.url;
		if(this.props.method === 'get') {
			fetch(url)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					var self=this;
	        		data.map((Event) => {
	            		console.log(Event)
	            		self.add(Event._id, Event.creator, Event.category,
                    Event.timeCreated, Event.equipment, Event.chat,
                    Event.name, Event.description, Event.time,
                    Event.place, Event.participants, Event.required_equipment, Event.image
                  );
						})
			 })
		} else if (this.props.method === 'post') {
			var params = this.props.params
			console.log(url)
			console.log(params)
			axios.post(url, {
			    params
			})
			.then((res) => {
					console.log(res)
					var self=this;
					res.data.map((Event) => {
							console.log(Event)
							self.add(Event._id, Event.creator, Event.category,
								Event.timeCreated, Event.equipment, Event.chat,
								Event.name, Event.description, Event.time,
								Event.place, Event.participants, Event.required_equipment, Event.image
	        		)
			 })
		})
	}
}


	eachEvent(Event, i) {
		// console.log(Event)
		return (
		<div className="card" >

        <div className="card-body" style= {{padding: "10px"}}>
				<EventItem key={Event._id} index={Event._id}
				onChange={this.update}
				onDelete={this.delete}>

                <section className= "imgLeft" style={{float:"left", width:"100px", height: "100px"}}>
                    <img className="card-img-top" src={Event.image}  alt="Card image cap" style={{padding:"5px"}}/>
								</section>
                    <h5 className="card-title" style={{marginTop: "15px", marginBottom:"0px", fontFamily: 'Love Ya Like A Sister', fontWeight: "bold"}}>{Event.name}</h5>
					<p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}>{Event.description}</p>
					<p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}><b>Time:</b> {Event.time}</p>
					<p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}><b>Place:</b> {Event.place}</p>
				</EventItem>
        </div>
        <div class="footer">
            <p style={{marginTop: "20px"}}> &copy; All right reserved to Roi Shmueli & Yair Shur</p>
        </div>
        </div>

		)
	}
	update(newEvent, i) {
		console.log('update: '+i+' '+newEvent)
		this.setState(prevState => ({
			Events: prevState.Events.map(
				Event => (Event._id !== i) ? Event : {...Event,name:newEvent}
			)
		}))
	}
	delete(_id) {
		console.log('deleted: '+_id)
		this.setState(prevState => ({
			Events: prevState.Events.filter(Event => Event._id !== _id)
		}))
	}
	add(_id, creator, category, timeCreated, equipment, chat,
    name, description, time, place, participants, required_equipment, image) {
		// console.log(typeof _id)
		// if ((typeof _id) !== 'string') {
		// 	var _id = this.numFor_id++;
		// 	var name = "some name";
		// 	var description = "some human name";
		// 	var creator = "some email";
		// 	var category = "some pass",
		// 		image = "some image"
		// }

		this.setState(prevState => ({
			Events: [
				...prevState.Events,
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
		console.log(this.state.Events);
		return (
            <div>
                <h4 style={{fontFamily: 'Love Ya Like A Sister'}}> Events List </h4>
							 <div className="card EventsList" style={{width: 22.5+'em', marginBottom: 7+'px', padding: '5px'}}>
							 		{this.state.Events.map(this.eachEvent)}
								<br/>
							</div>
        </div>
		)

	}
}

export default EventsList
