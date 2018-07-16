import React, { Component } from 'react'
import Category from './Category'

class CategoriesList extends Component {
 numFor_id = 4;
 constructor(props) {
   super(props)
   this.state = {
     Categories: []
   }
   this.eachCategory = this.eachCategory.bind(this)
   this.update = this.update.bind(this)
   this.delete = this.delete.bind(this)
   this.add = this.add.bind(this)
 }

 componentDidMount() {
    var url = "https://eventbreak.herokuapp.com/getAllCategories";
     fetch(url)
       .then((res) => {
         return res.json();
       })
       .then((data) => {
         var self=this;
             data.map((category) => {
                 console.log(category)
                 self.add(category);
             })
      })
  }
 update(name) {
   console.log('update: '+name)
   // this.props.onChange(name)
 }
 eachCategory(category, i) {
   console.log(category)
   return (
   <div className="card" >
        <div className="card-body">
       <Category key={i} index={i}
       onClick={this.update(category.name)} >
         <h5 className="card-title">{category.name}</h5>
       </Category>
        </div>
        </div>
   )
 }

 delete(_id) {
   console.log('deleted: '+_id)
   this.setState(prevState => ({
     Categories: prevState.Categories.filter(Category => Category.name !== _id)
   }))
 }
 add(name) {

   console.log(this.state.Categories)
   this.setState(prevState => ({
     Categories: [
       ...prevState.Categories,
       {
         name: name
       }]
   }))
   console.log(this.state.Categories)

 }

 render() {
   console.log(this.state.Categories);
   return (
    <div className="card CategoriesList" style={{width: 50+'em', marginBottom: 7+'px'}}>
     {this.state.Categories.map(this.eachCategory)}
   </div>
   )

 }
}

export default CategoriesList
