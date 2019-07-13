import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import Gallery from "react-photo-gallery";
import Iframe from 'react-iframe'
import Header from "./Header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PointDetails extends Component {

	constructor(props) {
		super(props)
		console.log(props);
		this.state = {
			point: this.props.location.state.point,
			reviews_num: 0,
			rating: 0,
			images: this.setImages()
		}
		this.setImages = this.setImages.bind(this);
		this.changeRating = this.changeRating.bind(this);
		this.eachDescription = this.eachDescription.bind(this);
		this.getMap = this.getMap.bind(this);
	}
	eachDescription(description, i) {
		return (
			<Card.Text key={i} index={i}>{description}</Card.Text>
		)
	}
	getMap(){
		const url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCmaNR4ecZxT5KTRxh2JVV0uQDl5nbgH-k&q="+this.state.point.latitude+","+this.state.point.longitude
		if(this.state.point.longitude) {
			return (
				<Iframe width='600' height='450' frameborder='0' style={{border:0}}
					url={url}	allowfullscreen />
			)
		}
	}
	changeRating( newRating, name ) {
	 this.setState({
		 rating: newRating
	 });
 	}
	setImages() {
		return this.props.location.state.point.image_url.map(function(i) {
			return {
				src: i,
				width: 1,
				height: 1
			}});
	}
	componentDidMount() {
		 const url = "https://citybreakshenkar.herokuapp.com/getPoint/"+this.props.location.state.point._id;
		 console.log(url)
		 fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				this.setState({
					point:data,
					reviews_num: data.feedbacks ? data.feedbacks.length : 0,
					rating: data.score ? data.score : 0
				});
			 })
	 }
	render(){
		console.log(this.state.point.description);
		return(
				<div>
					<Header />
					<div className='point'>
						<h1 style={{textAlign:'center', margin:'15px'}} id="productTitle" className="font-weight-bold mb-0">{this.props.location.state.point.name}</h1>
					</div>
					<Gallery photos={this.state.images}  direction={"column"} />
					<Card>
						<Card.Body style={{background:'#F2F1EF', direction:'rtl', textAlign:'right'}}>
							{this.state.point.description ? this.state.point.description.map(this.eachDescription) : ''}
						</Card.Body>
					</Card>
					<div className="mt-2 mb-3 d-md-flex align-items-center">
						<StarRatings
								starDimension="20px"
									starSpacing="1px"
									changeRating={this.changeRating}
								 rating={this.state.rating}
								 starRatedColor="orange"
								 numberOfStars={5}
								 name='rating'
							 />
							<div className="d-none d-md-inline-block small pr-3"> | </div>
							<div data-scroll-target="#userReviews" className="text-body" data-action-capture="click" data-action-servlet-name="product_detail" data-action-tag="click_review_top_link" data-action-prod-attr="256" data-attraction-product-id="5674SSGAUCHA">{this.state.reviews_num} Reviews</div>
					</div>
					<div className="small mr-md-4" style={{fontWeight:'bold'}}>{this.state.point.address}</div>
					<Link to='/points'>
						<button style={{width:'100%'}} className="btn btn-primary" >Close</button>
					</Link>
					{this.getMap}

				</div>
		)
	}
}

export default PointDetails
