import React, { Component } from 'react'
import Category from './Category'
import MdAdd from 'react-icons/lib/md/add'

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
   // this.next_id = this.next_id.bind(this)
 }

 componentDidMount() {
   // var url = this.props.url;
   // if(this.props.method === 'get') {
    var url = "https://eventbreak.herokuapp.com/getAllCategories";
     fetch(url)
       .then((res) => {
         return res.json();
       })
       .then((data) => {
         var self=this;
             data.map((Category) => {
                 console.log(Category)
                 self.add(Category._id, Category.name);
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
   //       		data.TopStories.map((Category) => {
   //           		console.log(Category)
    //               self.add(Category._id, Category.full_name, Category.phone, Category.email, Category.password, Category.image );
   //       		})
   // 	 })
   // }
  }

 eachCategory(Category, i) {
   // console.log(Category)
   return (
   <div className="card" >
        <div className="card-body">
       <Category key={Category._id} index={Category._id}
       onChange={this.update}
       onDelete={this.delete}>
         <h5 className="card-title">{Category.name}</h5>
         <p className="card-text">{Category.equipments}</p>
       </Category>
        </div>
        </div>
   )
 }
 update(newCategory, i) {
   console.log('update: '+i+' '+newCategory)
   this.setState(prevState => ({
     Categories: prevState.Categories.map(
       Category => (Category._id !== i) ? Category : {...Category,name:newCategory}
     )
   }))
 }
 delete(_id) {
   console.log('deleted: '+_id)
   this.setState(prevState => ({
     Categories: prevState.Categories.filter(Category => Category._id !== _id)
   }))
 }
 add(_id, name) {
   // console.log(typeof _id)
   if ((typeof _id) !== 'string') {
     var _id = this.numFor_id++;
     var name = "some name";
  //   var equipments = [];
   }

   this.setState(prevState => ({
     Categories: [
       ...prevState.Categories,
       {
         _id:_id,
         name: name,
    //     equipments: equipments,
       }]
   }))

 }

 render() {
   console.log(this.state.Categories);
   return (
    <div className="card CategoriesList" style={{width: 50+'em', marginBottom: 7+'px'}}>
     {this.state.Categories.map(this.eachCategory)}
     <br/><button onClick={this.add}
     _id="add" className="btn btn-primary" style={{marginRight: 7+'px'}}>
     Add <MdAdd/></button>
   </div>
   )

 }
}

export default CategoriesList
