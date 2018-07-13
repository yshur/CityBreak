import React, { Component } from 'react'
import EventItem from './EventItem'
import MdAdd from 'react-icons/lib/md/add'

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
		// var url = this.props.url;
		// if(this.props.method === 'get') {
    var url = "https://eventbreak.herokuapp.com/getAllEvents";
			fetch(url)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					var self=this;
	        		data.TopStories.map((Event) => {
	            		console.log(Event)
	            		self.add(Event._id, Event.creator, Event.category,
                    Event.timeCreated, Event.equipment, Event.chat,
                    Event.name, Event.description, Event.time,
                    Event.place, Event.participants, Event.required_equipment
                  );

	        		})
			 })
		// } else if (this.props.method === 'post') {
		// 	var params = this.props.params
		// 	fetch(this.props.url, {
		// 	  method: 'POST',
		// 	  headers: {
		// 	    Accept: 'application/json',
		// 	    'Content-Type': 'application/json',
		// 	  },
		// 	  body: JSON.stringify({
		// 	  	params
		// 	  }),
		// 	})
		// 	.then((res) => {
		// 			console.log(res)
		// 			return res.json();
		// 		})
		// 		.then((data) => {
		// 			console.log(data)
		// 			var self=this;
	  //       		data.TopStories.map((Event) => {
	  //           		console.log(Event)
    //               self.add(Event._id, Event.full_name, Event.phone, Event.email, Event.password, Event.image );
	  //       		})
		// 	 })
		// }
	 }

	eachEvent(Event, i) {
		// console.log(Event)
		return (
		<div className="card" >
        <div className="card-body">
				<EventItem key={Event._id} index={Event._id}
				onChange={this.update}
				onDelete={this.delete}>
					<h5 className="card-title">{Event.name}</h5>
					<p className="card-text">{Event.description}</p>
					<p className="card-text">time: {Event.time}</p>
					<p className="card-text">place: {Event.place}</p>
          <p className="card-text">place: {Event.participants}</p>
          <p className="card-text">place: {Event.equipments}</p>
				</EventItem>
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
    name, description, time, place, participants, required_equipment) {
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
          place: place,
          participants: participants,
          required_equipment: required_equipment
  			}]
		}))

	}

	render() {
		console.log(this.state.Events);
		return (
		 <div className="card EventsList" style={{width: 50+'em', marginBottom: 7+'px'}}>
		 	{this.state.Events.map(this.eachEvent)}
			<br/><button onClick={this.add}
			_id="add" className="btn btn-primary" style={{marginRight: 7+'px'}}>
			Add <MdAdd/></button>
		</div>
		)

	}
}

export default EventsList
