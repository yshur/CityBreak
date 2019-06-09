'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    User = require('./schemas/user'),
    Point = require('./schemas/point'),
    Tour = require('./schemas/tour');

exports.getPoints = (req, res) => {
    console.log('getPoints');
	var q = Point.find({},{"_id":1, "name":1,"about":1,"image_url":1,"tags":1,"address":1,"area":1,"sub_area":1,"accessibility":1,"recommended_season":1 });
	q.exec(function(err, points)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
		}
		console.log(points);
		res.status(200).json(points);
	});
};
exports.getPoint = (req, res) => {
	console.log(`getPoint: pointid = ${req.params.pointid}`);
    var pointid = req.params.pointid;
    
    Point.findById(pointid,
        (err, point) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err} }`);
            }
            console.log(point);
            res.status(200).json(point);
        }
    )
};
exports.deletePoint = (req, res) => {
	console.log(`deletePoint: pointid = ${req.params.pointid}`);
    var pointid = req.params.pointid;
	
    User.findByIdAndRemove(pointid, (err, point) => {
          // As always, handle any potential errors:
          if (err) return res.status(300).json(err);
          // We'll create a simple object to send back with a message and the id of the document that was removed
          // You can really do this however you want, though.
          if (point == null){
            return res.status(200).json({"message": `Point ${pointid} not found`});
          } else {
            return res.status(200).json({"message": `Point ${pointid} successfully deleted`});
          }
      });
};
exports.createPoint = (req, res) => {
    var newPoint = new Point({
        name: 			req.body.name,
        about: 			req.body.about,
        description: 	req.body.description,
        image_url: 		req.body.image_url,
        reference_url: 	req.body.reference_url,
        tags: 			req.body.tags,
        duration: 		req.body.duration,
        address: 		req.body.address,
        latitude: 		req.body.latitude,
        longitude: 		req.body.longitude,
        area: 			req.body.area,
        sub_area: 		req.body.sub_area,
        accessibility: 	req.body.accessibility,
        recommended_season: req.body.recommended_season
    });
    console.log('createPoint:');
    console.log(newPoint);

    newPoint.save(
        (err) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Saved document:`);
                res.status(200).json(newPoint);
            }
        });
};