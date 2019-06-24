'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
		url = require('url'),
    User = require('./schemas/user'),
    Point = require('./schemas/point'),
    Tour = require('./schemas/tour');

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
        recommended_season: req.body.recommended_season,
				loc: req.body.loc
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
exports.getPoints = (req, res) => {
  console.log('getPoints');
	var queryData = url.parse(req.url, true).query;
	var params = {};
	var show = {
		"_id":1, "name":1,"about":1,"image_url":1,"tags":1,
		"address":1,"area":1,"sub_area":1,"accessibility":1,
		"recommended_season":1
		};
	if (queryData.area) {
		params.area = queryData.area;
	}
	if (queryData.sub_area) {
		params.sub_area = queryData.sub_area;
	}
	if (queryData.accessibility) {
		params.accessibility = queryData.accessibility;
	}
	if (queryData.tags) {
		params.tags = { $in: queryData.tags.split(",") };
	}
	if (queryData.near) {
		var near = queryData.near.split(",").map(function(v) {
		  return Number(v);
		});
		params.loc = {
		   $near: {
					$maxDistance: 150000,
					$geometry: {
					 type: "Point",
					 coordinates: near
					}
		   }
		 };
		console.log(params.loc.$near.$geometry);
	}

	console.log(params);
	var q = Point.find(params, show);
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
exports.getPointById = (pointid) => {
	console.log(`getPointById: pointid = ${pointid}`);
    Point.findById(pointid,
        (err, point) => {
            if (err) {
                console.log(`err: ${err}`);
                // return err;
            }
            // console.log(point);
            return point;
        }
    )
};
exports.updatePoint = (req, res) => {
	var pointid = req.params.pointid;
	console.log(`updatePoint: pointid = ${req.params.pointid}`);
    var params = {};
	if (req.body.name) {
		params.name = req.body.name;
	}
	if (req.body.about) {
		params.about = req.body.about;
	}
	if (req.body.description) {
		params.description = req.body.description;
	}
	if (req.body.image_url) {
		params.image_url = req.body.image_url;
	}
	if (req.body.reference_url) {
		params.reference_url = req.body.reference_url;
	}
	if (req.body.tags) {
		params.tags = req.body.tags;
	}
	if (req.body.duration) {
		params.duration = req.body.duration;
	}
	if (req.body.address) {
		params.address = req.body.address;
	}
	if (req.body.latitude) {
		params.latitude = req.body.latitude;
	}
	if (req.body.longitude) {
		params.longitude = req.body.longitude;
	}
	if (req.body.area) {
		params.area = req.body.area;
	}
	if (req.body.accessibility != null) {
		params.accessibility = req.body.accessibility;
	}
	if (req.body.sub_area) {
		params.sub_area = req.body.sub_area;
	}
	if (req.body.recommended_season) {
		params.recommended_season = req.body.recommended_season;
	}
	if (req.body.loc) {
		params.loc = req.body.loc;
	}
	console.log(params);
    var opts = {
        new: true
    };
    Point.findByIdAndUpdate(pointid, params, opts,
        (err, point) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Updated point: ${point}`)
                res.status(200).json(point);
            }
        });
};
exports.deletePoint = (req, res) => {
	console.log(`deletePoint: pointid = ${req.params.pointid}`);
    var pointid = req.params.pointid;

    Point.findByIdAndRemove(pointid, (err, point) => {
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

exports.getAreas = (req, res) => {
    console.log('getAreas');
    var q = Point.distinct( "area" );

    q.exec(function(err, areas)  {
        if (err) {
          console.log(`err: ${err}`);
          res.status(200).json(`{ err : ${err} }`);
        }
        console.log(areas);
        res.status(200).json(areas);
    });
}
exports.getSubAreas = (req, res) => {
    console.log('getSubAreas');
    var q = Point.distinct( "sub_area" );

    q.exec(function(err, sub_areas)  {
        if (err) {
          console.log(`err: ${err}`);
          res.status(200).json(`{ err : ${err} }`);
        }
        console.log(sub_areas);
        res.status(200).json(sub_areas);
    });
}
exports.getTags = (req, res) => {
    console.log('getTourTags');
    var q = Point.distinct( "tags" );

    q.exec(function(err, tags)  {
        if (err) {
          console.log(`err: ${err}`);
          res.status(200).json(`{ err : ${err} }`);
        }
        console.log(tags);
        res.status(200).json(tags);
    });
}
