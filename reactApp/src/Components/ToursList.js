import React, { Component } from 'react'
import Tour from './Tour'

class ToursList extends Component {

	constructor(props) { 
		super(props)
		this.state = {
			tours: []
		}
		this.eachTour = this.eachTour.bind(this)
		this.add = this.add.bind(this)
	}
	componentDidMount() {
		 const url = "http://localhost:3000/getAllTours";
		 fetch(url)
		 	.then((res) => {
		 		return res.json();
		 	})
		 	.then((data) => {
		 		var self=this;
		 		data.map((data) => {
		 			console.log('tour')
		 			self.add(data.id, data.source, data.lengthInKm, data.description, data.imagesUrls[0], data.title, data.category, data.location);
					// "id":1,"source":1,"lengthInKm":1,"description":1,"imagesUrls":1,"title":1,"category":1,"location":1
		 		})
			 })
	 }
	eachTour(tour, i) {
		console.log(tour.id)
		return (
			<div key={'container '+i} >
			<div className="card-body" style={{color:"black", border:"1px black solid"}}>
				<Tour key={tour.id} index={tour.id} >
					<h3 className="card-title">{tour.title}</h3>
					<p className="card-text">{tour.description}</p>
					<p className="card-text"><img style={{width:"60px",height:"60px"}} src={tour.imagesUrls} alt={tour.title} /></p>
				</Tour>
			</div>
			</div>
		)
	}
	add(id,source,lengthInKm,description,imagesUrls,title,category,location) {

		this.setState(prevState => ({
			tours: [
				...prevState.tours,
				{
					id:id,
					source:source,
					lengthInKm:lengthInKm,
					description:description,
					imagesUrls:imagesUrls,
					title:title,
					category:category,
					location:location
				}]
		}))
		
	}	

	render() {
		return (
		 <div className="card toursList" style={{width: 18+'rem', marginBottom: 7+'px'}}>
		 	{this.state.tours.map(this.eachTour)}
			<br/>
		</div>
		)
				
	}

}

export default ToursList
