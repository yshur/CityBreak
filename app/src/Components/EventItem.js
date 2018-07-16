import React, { Component } from 'react'
// import EventDetails from './EventDetails'

class EventItem extends Component {

 constructor(props) {
   super(props)
   this.state = {
     editing: false
   }
   this.renderForm = this.renderForm.bind(this)
   this.renderKindel = this.renderKindel.bind(this)
   this.setEdit = this.setEdit.bind(this)
   this.eachItem = this.eachItem.bind(this)
   this.eachEq = this.eachEq.bind(this)
 }
 setEdit() {
   console.log("setEdit")
   console.log(  this.state.editing)
   if (this.state.editing === false) {
     this.setState({
 			editing: true
 		})
  } else {
    this.setState({
			editing: false
		})
  }
  console.log(  this.state.editing)
 }
 eachItem(array) {
   console.log(array)
   if (typeof array === "undefined") {
       return;
   }
   var c = ""
   array.map(i => {
     c += i+", "
   })
   return c
 }
 eachEq(array) {
   console.log(array)
   if (typeof array === "undefined") {
       return;
   }
   var c = ""
   array.map(i => {
     if (typeof i.equipmentName === "undefined") {
         return;
     }
     c += i.equipmentName+", "
   })
   return c
 }
 renderForm() {
   return (
     <div className='event card-body'  onClick={this.setEdit}>
       <div>
         {this.props.children}
         <p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}>Created by Creator-id: {this.props.event.creator},
            at {this.props.event.timeCreated}</p>
         <p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}>Categories: {this.eachItem(this.props.event.category)}</p>
         <p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}>Equipment:{this.eachEq(this.props.event.equipment)}</p>
         <p className="card-text" style={{fontFamily: "Roboto Condensed", marginBottom:"0px"}}>Participants-id:{this.eachItem(this.props.event.participant)}</p>

       </div>
     </div>
   )
 }
 renderKindel() {
   return (
     <div  onClick={this.setEdit} className='event card-body'>
       <div>{this.props.children}</div>
     </div>
   )
 }

 render() {
    if (this.state.editing === true)
     return this.renderForm();
   else
     return this.renderKindel();
 }
}

export default EventItem
