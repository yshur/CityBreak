import React, { Component } from 'react'
import EventDetails from './EventDetails'
import CategoriesList from './CategoriesList'
import EquipmentsList from './EquipmentsList'
import UsersList from './UsersList'
import axios from 'axios'

class CreateEvent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editing: 0,
      userid: "5b1fd44078396b17983c8732",
      name: "",
      desc: "",
      time: "",
      place: "",
      categories: "",
      equipment: "",
      users: "",
      url: "",
      method: "post",
      params: "",
      newEvent: {}
  }
    this.renderForm1 = this.renderForm1.bind(this);
    this.renderForm2 = this.renderForm2.bind(this);
    this.renderForm3 = this.renderForm3.bind(this);
    this.renderForm4 = this.renderForm4.bind(this);
    this.renderForm5 = this.renderForm5.bind(this);
    this.renderUI1  = this.renderUI1.bind(this);
    this.renderUI2  = this.renderUI2.bind(this);
    this.setEvent1 = this.setEvent1.bind(this);
    this.setEvent2 = this.setEvent2.bind(this);
    this.setEvent3 = this.setEvent3.bind(this);
    this.setEvent4 = this.setEvent4.bind(this);
    this.setEvent5 = this.setEvent5.bind(this);
    this.previusForm = this.previusForm.bind(this);
    this.nextForm = this.nextForm.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.setEqEvent = this.setEqEvent.bind(this);
    this.inviteUser = this.inviteUser.bind(this);

  }
  previusForm(e) {
    console.log("previusForm")

    console.log(this.state.editing)
      console.log(this.state.newEvent)
      console.log(this.state.url)
  	e.preventDefault();
  	this.setState({
      editing: this.state.editing-1
  	});
  }
  nextForm(e) {
    console.log("nextForm")

    console.log(this.state.editing)
      console.log(this.state.newEvent)
      console.log(this.state.url)
    e.preventDefault();
    this.setState({
      editing: this.state.editing+1
    });
  }

  createEvent() {
    console.log("createEvent")
    var url = "https://eventbreak.herokuapp.com/createEvent"

    axios.post(url, {
		    'creator': this.state.userid,
        'time': this.state.time,
        'place': this.state.place,
        'name': this.state.name,
        'description': this.state.desc,
        'category': this.state.category,

		})
		.then((res) => {
				console.log("res.data" + res.data)
        this.setState({
          newEvent: res.data
        });
		 })

  }
  setEqEvent(equipment) {
    console.log("setEqEvent")
    var url = "https://eventbreak.herokuapp.com/setEqEvent"
    axios.post(url, {
		    'eventid': this.state.newEvent._id,
        'equipment': equipment,
        'max_quantity': 1,
        'min_quantity': 1,
		})
		.then((res) => {
				console.log("res.data" + res.data)
        this.setState({
          newEvent: res.data
        });
		 })

  }
  inviteUser(user) {
    console.log("inviteUser")
    var url = "https://eventbreak.herokuapp.com/inviteUser"
    axios.post(url, {
		    'eventid': this.state.newEvent._id,
        'userid': user,
		})
		.then((res) => {
				console.log(res.data)
        this.setState({
          newEvent: res.data
        });
		 })

  }

  componentDidMount() {
    console.log("componentDidMount")
    if(this.state.editing === 6) {
  		var params = this.state.params
  		fetch(this.state.url, {
  		  method: 'POST',
  		  headers: {
  		    Accept: 'application/json',
  		    'Content-Type': 'application/json',
  		  },
  		  body: JSON.stringify({
  		  	params
  		  }),
  		})
  		.then((res) => {
  				console.log(res)
  				return res.json();
  			})
  			.then((data) => {
  				console.log(data)
  				var self=this;
          		data.map((event) => {
              		console.log(event)
                  this.setState({
               			newEvent: event,
                    editing: 7
               		});
          		})
  		 })
  	}

  }

  setEvent1(e) {
    console.log("setEvent1")

    console.log(this.state.editing)
    console.log(this.state.newEvent)
    console.log(this.state.url)
  	e.preventDefault();
  	var name = document.getElementById('name').value,
      desc = document.getElementById('desc').value;
  	this.setState({
  		name: name,
      desc: desc,
      params: this.state.params+"name:"+name+",description:"+desc+",",
      editing: this.state.editing+1
  	});
  }
  setEvent2(e) {
    console.log("setEvent2")
    console.log(this.state.editing)
    console.log(this.state.newEvent)
    console.log(this.state.url)
  	e.preventDefault();
  	var time = document.getElementById('time').value,
      place = document.getElementById('place').value;
  	this.setState({
  		time: time,
      place: place,
      params: this.state.params+"time:"+time+",place:"+place+",",
      editing: this.state.editing+1
  	});
  }
  setEvent3(e) {
    console.log("setEvent3")
    console.log(this.state.editing)
    console.log(this.state.newEvent)
    console.log(this.state.url)
  	e.preventDefault();
  	var categories = document.getElementById('categories').value
  	this.setState({
  		categories: categories,
      params: this.state.params+"categories:"+categories+"}",
      editing: this.state.editing+1

    });
    console.log(this.state.params)
    this.createEvent()
  }
  setEvent4(e) {
    console.log("setEvent4")
    console.log(this.state.editing)
    console.log(this.state.newEvent)
    console.log(this.state.url)
  	e.preventDefault();
  	var equipments = document.getElementById('equipments').value
  	this.setState({
      url: "https://eventbreak.herokuapp.com/setEqEvent",
  		equipments: equipments,
      params: "{eventid:"+this.state.newEvent._id+",equipment:"+equipments
        +",max_quantity:1,min_quantity:1}",
      editing: this.state.editing+1
  	});
    console.log(this.state.params)
    this.setEqEvent(equipments)
  }
  setEvent5(e) {
    console.log("setEvent5")
    console.log(this.state.editing)
    console.log(this.state.newEvent)
    console.log(this.state.url)

  	e.preventDefault();
  	var users = document.getElementById('users').value
  	this.setState({
      url: "https://eventbreak.herokuapp.com/inviteUser",
      users: users,
      params: "{eventid:"+this.state.newEvent._id+",userid:"+users+"}",
      editing: this.state.editing+1

    });
    this.inviteUser(users)
  }

  renderForm1() {
    console.log("renderForm1")
    console.log(this.state.editing)
    console.log(this.state.newEvent)
    console.log(this.state.url)

    return (
      <div className="container" >
        <h2 style={{fontFamily: 'Love Ya Like A Sister', padding:"20px" }}>Create New Event</h2>
        <h4 style={{fontFamily: 'Love Ya Like A Sister', marginBottom:"25px", marginLeft:"0px"}}>Name & Description</h4>
        <form onSubmit={this.setEvent1}>
          <div className="form-group">
            <label>Event Name:</label>
            <input type="text" className="form-control" style={{marginLeft:"0px" , marginTop:"5px"}} placeholder="Enter Event Name" id="name" />
          </div>
          <div className="form-group">
            <label>Event Description:</label>
            <input type="text" className="form-control" style={{marginLeft:"0px", marginTop:"5px"}} placeholder="Enter Event Description" id="desc" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.setEvent1} >Continue</button>
        </form>
        <div class="footer">
            <p style={{marginTop: "20px"}}> &copy; All right reserved to Roi Shmueli & Yair Shur</p>
        </div>
      </div>
    )
  }
  renderForm2() {
    console.log("renderForm2")
    console.log(this.state.editing)
    console.log(this.state.newEvent)
    console.log(this.state.url)
    return (
    	<div className="container">
    	  <h2 style={{fontFamily: 'Love Ya Like A Sister', padding:"20px" }}>Create New Event</h2>
        <h4 style={{fontFamily: 'Love Ya Like A Sister', marginBottom:"25px", marginLeft:"0px"}}>Time & Place</h4>
    	  <form onSubmit={this.setEvent2}>
    	    <div className="form-group">
    	      <label>Event Time:</label>
    	      <input type="date" className="form-control" style={{marginLeft:"0px" , marginTop:"5px"}} placeholder="Enter Event Time" id="time" />
    	    </div>
          <div className="form-group">
            <label>Event Place:</label>
            <input type="text" className="form-control" style={{marginLeft:"0px" , marginTop:"5px"}} placeholder="Enter Event Place" id="place" />
          </div>
    	    <button type="submit" className="btn btn-primary" onClick={this.setEvent2} >Continue</button>
    	  </form>
        <br /><button type="submit" className="btn btn-primary" onClick={this.previusForm} >Back</button>
        <div class="footer">
            <p style={{marginTop: "20px"}}> &copy; All right reserved to Roi Shmueli & Yair Shur</p>
        </div>
    	</div>
    )
  }
  renderForm3() {
    console.log("renderForm3")
    console.log(this.state.editing)
    console.log(this.state.newEvent)
    console.log(this.state.url)
		return (
      <div>
  			<div className="container" >
  			  <h2 style={{fontFamily: 'Love Ya Like A Sister', padding:"20px" }}>Create New Event</h2>
          <h4 style={{fontFamily: 'Love Ya Like A Sister', marginBottom:"25px", marginLeft:"0px"}}>Categories</h4>
  			  <form onSubmit={this.setEvent3}>
  			    <div className="form-group">
  			      <label>Event Categories:</label>
  			      <input type="text" className="form-control" style={{marginLeft:"0px" , marginTop:"5px"}} placeholder="Enter Event Categories" id="categories" />
  			    </div>
  			    <button type="submit" className="btn btn-primary"  onClick={this.setEvent3} >Continue</button>
  			  </form>
          <br /><button type="submit" className="btn btn-primary" onClick={this.previusForm} >Back</button>
  			</div>
    		 <div className="card CategoriesList" style={{width: 50+'em', marginBottom: 7+'px'}}>
    			 	<CategoriesList key='22536' index='22536' />
    		</div>
      </div>
  		)
  	}
  renderForm4() {
    console.log("renderForm4")
    console.log(this.state.editing)
    console.log(this.state.newEvent)
    console.log(this.state.url)
  	return (
      <div>
  		<div className="container" style={{width: 50+'em', marginBottom: 7+'px'}}>
  		  <h2>Create New Event</h2>
        <h4>Equipments</h4>
  		  <form onSubmit={this.setEvent4}>
  		    <div className="form-group">
  		      <label>Event Equipments:</label>
  		      <input type="text" className="form-control" placeholder="Enter Event Equipments" id="equipments" />
  		    </div>
  		    <button type="submit" className="btn btn-default" onClick={this.setEvent4} >Continue</button>
  		  </form>
        <br /><button type="submit" className="btn btn-default" onClick={this.previusForm} >Back</button>
  		</div>
      <div className="card EquipmentsList" style={{width: 50+'em', marginBottom: 7+'px'}}>
         <CategoriesList key='22538' index='22538' />
     </div>
   </div>
  	)
  }
  renderForm5() {
    console.log("renderForm5")
    console.log(this.state.editing)
 		console.log(this.state.newEvent)
 		console.log(this.state.url)
		return (
      <div>
  			<div className="container" style={{width: 50+'em', marginBottom: 7+'px'}}>
  			  <h2>Create New Event</h2>
          <h4>Participants</h4>
  			  <form onSubmit={this.setEvent5}>
  			    <div className="form-group">
  			      <label>Event Participants:</label>
  			      <input type="text" className="form-control" placeholder="Enter Event Participants" id="users" />
  			    </div>
  			    <button type="submit" className="btn btn-default" onClick={this.setEvent5} >Submit</button>
  			  </form>
          <br /><button type="submit" className="btn btn-default" onClick={this.previusForm} >Back</button>
  			</div>
        <div className="card UsersList" style={{width: 50+'em', marginBottom: 7+'px'}}>
           <UsersList key='22540' index='22540' />
       </div>
     </div>
		)
	}

	renderUI1() {
   	//	this.setUrl();
    console.log("renderUI1")

		console.log(this.state.editing)
   		console.log(this.state.newEvent)
   		console.log(this.state.url)
      return (
      <div className="card" >
          <div className="card-body">
          <EventDetails key={this.state.newEvent._id} index={this.state.newEvent._id}
          onChange={this.update}
          onDelete={this.delete}>
            <h5 className="card-title">{this.state.newEvent.name}</h5>
            <p className="card-text">{this.state.newEvent.description}</p>
            <p className="card-text">Time: {this.state.newEvent.time}</p>
            <p className="card-text">Place: {this.state.newEvent.place}</p>
            <p className="card-text">Creator: {this.state.newEvent.creator}</p>
            <p className="card-text">Categories: {this.state.newEvent.categories}</p>
            <p className="card-text">Equipments: {this.state.newEvent.equipments}</p>
            <p className="card-text">Participants: {this.state.newEvent.participants}</p>

          </EventDetails>
          <button type="submit" className="btn btn-default" onClick={this.nextForm} >Continue Set Event</button>
          <button type="submit" className="btn btn-default" onClick={this.previusForm} >Back</button>

          </div>
          </div>

      )

	}
	renderUI2() {
   	//	this.setUrl();
    console.log("renderUI2")

		console.log(this.state.editing)
   		console.log(this.state.newEvent)
   		console.log(this.state.url)
      return (
      <div className="card" >
          <div className="card-body">
          <EventDetails key={this.state.newEvent._id} index={this.state.newEvent._id}
          onChange={this.update}
          onDelete={this.delete}>
            <h5 className="card-title">{this.state.newEvent.name}</h5>
            <p className="card-text">{this.state.newEvent.description}</p>
            <p className="card-text">Time: {this.state.newEvent.time}</p>
            <p className="card-text">Place: {this.state.newEvent.place}</p>
            <p className="card-text">Creator: {this.state.newEvent.creator}</p>
            <p className="card-text">Categories: {this.state.newEvent.categories}</p>
            <p className="card-text">Equipments: {this.state.newEvent.equipments}</p>
            <p className="card-text">Participants: {this.state.newEvent.participants}</p>

          </EventDetails>

          </div>
          </div>

      )

	}

	render() {
    switch (this.state.editing) {
      case 0:
        return this.renderForm1()
      case 1:
        return this.renderForm2()
      case 2:
        return this.renderForm3()
      case 3:
        return this.renderUI1()
      case 4:
        return this.renderForm4()
      case 5:
        return this.renderUI1()
      case 6:
        return this.renderForm5()
      case 7:
        return this.renderUI2()
    }
	}
}

export default CreateEvent
