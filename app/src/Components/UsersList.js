import React, { Component } from 'react'
import UserItem from './UserItem'
import MdAdd from 'react-icons/lib/md/add'

class UsersList extends Component {
	numFor_id = 4;
	constructor(props) {
		super(props)
		this.state = {
			Users: []
		}
		this.eachUser = this.eachUser.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
		this.add = this.add.bind(this)
		// this.next_id = this.next_id.bind(this)
	}

	componentDidMount() {
		console.log("componentDidMount")

		// var url = this.props.url;
		// if(this.props.method === 'get') {
    var url = "https://eventbreak.herokuapp.com/getAllUsers";
		console.log(url)

			fetch(url)
				.then((res) => {
					console.log(res)

					return res.json();
				})
				.then((data) => {
					console.log(data)

					var self=this;
	        		data.map((User) => {
	            		console.log(User)
	            		self.add(User._id, User.full_name, User.phone, User.email, User.password, User.image );

	        		})
			 });
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
	  //       		data.TopStories.map((User) => {
	  //           		console.log(User)
    //               self.add(User._id, User.full_name, User.phone, User.email, User.password, User.image );
	  //       		})
		// 	 })
		// }
	 }

	eachUser(User, i) {
		console.log(User)
		return (
		<div className="card" >
        <div className="card-body">
				<UserItem key={User._id} index={User._id}
				onChange={this.update}
				onDelete={this.delete}>
					<h5 className="card-title">{User.full_name}</h5>
					<p className="card-text">email: {User.email}</p>
					<p className="card-text">phone: {User.phone}</p>
					<p className="card-text">pass: {User.password}</p>
				  <image src='{User.image}' />
				</UserItem>
        </div>
        </div>

		)
	}
	update(newUser, i) {
		console.log('update: '+i+' '+newUser)
		this.setState(prevState => ({
			Users: prevState.Users.map(
				User => (User._id !== i) ? User : {...User,full_name:newUser}
			)
		}))
	}
	delete(_id) {
		console.log('deleted: '+_id)
		this.setState(prevState => ({
			Users: prevState.Users.filter(User => User._id !== _id)
		}))
	}
	add(_id, full_name, phone, email, password, image) {
		console.log(typeof _id)
		if ((typeof _id) !== 'string') {
			var _id = this.numFor_id++;
			var full_name = "some name";
			var phone = "some human name";
			var email = "some email";
			var password = "some pass",
				image = "some image"
		}

		this.setState(prevState => ({
			Users: [
				...prevState.Users,
				{
					_id:_id,
					full_name: full_name,
					phone: phone,
					email: email,
					password: password,
					image: image
				}]
		}))

	}

	render() {
		console.log(this.state.Users);
		return (
		 <div className="card UsersList" style={{width: 50+'em', marginBottom: 7+'px'}}>
		 	{this.state.Users.map(this.eachUser)}
			<br/><button onClick={this.add}
			_id="add" className="btn btn-primary" style={{marginRight: 7+'px'}}>
			Add <MdAdd/></button>
		</div>
		)

	}
}

export default UsersList
