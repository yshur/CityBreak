import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import Gallery from "react-photo-gallery";

class PointDetails extends Component {

	constructor(props) {
		super(props)
		this.state = {
			point: this.props.point,
			reviews_num: 0,
			rating: 0,
			images: this.setImages()
		}
		this.setImages = this.setImages.bind(this);
		this.changeRating = this.changeRating.bind(this);
		this.closeItem = this.closeItem.bind(this);
	}
	changeRating( newRating, name ) {
	 this.setState({
		 rating: newRating
	 });
 }
	closeItem(e){
		e.preventDefault()
		this.props.onChange(this.props.point)
	}
	setImages() {
		return this.props.point.image_url.map(function(i) {
			return {
				src: i,
				width: 1,
				height: 1
			}});
	}
	componentDidMount() {
		 const url = "http://localhost:3000/getPoint/"+this.props.point._id;
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
		return(
				<div className='point'>
					<div>
					<h1  id="productTitle" className="font-weight-bold mb-0" style={{textAlign:'center'}}>{this.props.point.name}</h1>
					</div>

					<Card>
						<Gallery photos={this.state.images}  direction={"column"} />
						<Card.Body style={{background:'#F2F1EF', width:'100%'}}>
							<Card.Text>Description: {this.state.point.description}</Card.Text>
						</Card.Body>
						<div className="d-none d-md-inline-block small pr-3"> | </div>
						<div className="small mr-md-4">Adress: {this.state.point.address}</div>
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
						</div>
							<div data-scroll-target="#userReviews" className="text-body" data-action-capture="click" data-action-servlet-name="product_detail" data-action-tag="click_review_top_link" data-action-prod-attr="256" data-attraction-product-id="5674SSGAUCHA">{this.state.reviews_num} Reviews</div>
							<button className="btn btn-primary" onClick={this.closeItem}>Close</button>
					</Card>
				</div>
		)
	}
}

export default PointDetails
