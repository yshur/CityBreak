import React, { Component } from 'react'
import EquipmentItem from './EquipmentItem'
import MdAdd from 'react-icons/lib/md/add'

class EquipmentsList extends Component {
 numForid = 4;
 constructor(props) {
   super(props)
   this.state = {
     Equipments: []
   }
   this.eachEquipment = this.eachEquipment.bind(this)
   this.update = this.update.bind(this)
   this.delete = this.delete.bind(this)
   this.add = this.add.bind(this)
   // this.nextid = this.nextid.bind(this)
 }

 componentDidMount() {
   // var url = this.props.url;
   // if(this.props.method === 'get') {
    var url = "https://eventbreak.herokuapp.com/getAllEquipments";
     fetch(url)
       .then((res) => {
         return res.json();
       })
       .then((data) => {
         var self=this;
             data.map((Equipment) => {
                 console.log(Equipment)
                 self.add(Equipment.name );
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
   //       		data.TopStories.map((Equipment) => {
   //           		console.log(Equipment)
    //               self.add(Equipment.id, Equipment.full_name, Equipment.phone, Equipment.email, Equipment.password, Equipment.image );
   //       		})
   // 	 })
   // }
  }

 eachEquipment(Equipment, i) {
    this.numForid++;
   // console.log(Equipment)
   return (
   <div className="card" >
        <div className="card-body">
       <EquipmentItem key={ this.numForid } index={ this.numForid }
       onChange={this.update}
       onDelete={this.delete}>
         <h5 className="card-title">{Equipment.name}</h5>
       </EquipmentItem>
        </div>
        </div>
   )
 }
 update(newEquipment, i) {
   console.log('update: '+i+' '+newEquipment)
   this.setState(prevState => ({
     Equipments: prevState.Equipments.map(
       Equipment => (Equipment.id !== i) ? Equipment : {...Equipment,name:newEquipment}
     )
   }))
 }
 delete(id) {
   console.log('deleted: '+id)
   this.setState(prevState => ({
     Equipments: prevState.Equipments.filter(Equipment => Equipment.id !== id)
   }))
 }
 add(name) {
   // console.log(typeof id)
   // if ((typeof id) !== 'string') {
     var id = this.numForid;
   //   var name = "some name";
   //   var equipments = [];
   // }

   this.setState(prevState => ({
     Equipments: [
       ...prevState.Equipments,
       {
         id:id,
         name: name
       }]
   }))

 }

 render() {
   console.log(this.state.Equipments);
   return (
    <div className="card EquipmentsList" style={{width: 50+'em', marginBottom: 7+'px'}}>
     {this.state.Equipments.map(this.eachEquipment)}
     <br/><button onClick={this.add}
     id="add" className="btn btn-primary" style={{marginRight: 7+'px'}}>
     Add <MdAdd/></button>
   </div>
   )

 }
}

export default EquipmentsList
