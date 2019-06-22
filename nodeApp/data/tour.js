'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    url = require('url'),
    User = require('./schemas/user'),
    Tour = require('./schemas/tour'),
    Point = require('./schemas/point');

exports.createTour = (req, res) => {
    var newTour = new Tour({
        name:       req.body.name,
        about:      req.body.about,
        description: req.body.description,
        creator:    req.body.creator,
        area: 			req.body.area,
        sub_area:   req.body.sub_area,
        start_point: req.body.start_point,
        accessibility: req.body.accessibility,
        recommended_season: req.body.recommended_season
    });
    console.log('Create Tour');
    newTour.save(
        (err) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Saved document:`);
                res.status(200).json(newTour);
                console.log(newTour);
            }
        });
};
exports.getTours = (req, res) => {
    console.log('getTours');
    var limit = 20;
    var queryData = url.parse(req.url, true).query;
    var params = {};
    var show = {
      "_id":1, "name":1,"about":1,"tags":1,"duration":1,
      "distance":1,"area":1,"sub_area":1,"accessibility":1,
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
    if (queryData.duration) {
      params.duration = { $lt: queryData.duration };
    }
    if (queryData.distance) {
      params.distance = { $lt: queryData.distance };
    }
    if (queryData.limit) {
      limit = Number(queryData.limit);
    }
    // if (queryData.near) {
    //   var near = queryData.near.split(",").map(function(v) {
    //     return Number(v);
    //   });
    //   params.loc = {
    //      $near: {
    //     $maxDistance: 1000,
    //     $geometry: {
    //      type: "Point",
    //      coordinates: near
    //     }
    //      }
    //    };
    //   // params.loc = { $near: { $geometry: {type: 'Point', coordinates:queryData.near.split(",") }, $maxDistance: 10 } };
    //   // params.loc = { $near: {type: 'Point', coordinates: queryData.near.split(",") } };
    //   console.log(params.loc.$near.$geometry);
    // }

    console.log(params);
    var q = Tour.find(params, show).limit(limit);
    q.exec(function(err, tours)  {
      if (err) {
        console.log(`err: ${err}`);
        res.status(200).json(`{ err : ${err}`);
      }
      console.log(tours);
      res.status(200).json(tours);
    });
};
exports.getTour = (req, res) => {
    var tourid = req.params.tourid;
    console.log(`getTour: tourid = ${req.params.tourid}`);
    Tour.findById(tourid,
        (err, tour) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err} }`);
            }
            console.log(tour);
            res.status(200).json(tour);
        }
    )
};
exports.updateTour = (req, res) => {
	var tourid = req.params.tourid;
	console.log(`updateTour: tourid = ${req.params.tourid}`);
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
	if (req.body.start_point) {
		params.start_point = req.body.start_point;
	}

    var opts = {
        new: true
    };
    console.log(params);
    Tour.findByIdAndUpdate(tourid, params, opts,
        (err, tour) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Updated tour: ${tour}`)
                res.status(200).json(tour);
            }
        });
};
exports.deleteTour = (req, res) => {
	console.log(`deleteTour: tourid = ${req.params.tourid}`);
    var tourid = req.params.tourid;

    Tour.findByIdAndRemove(tourid, (err, tour) => {
          // As always, handle any potential errors:
          if (err) return res.status(300).json(err);
          // We'll create a simple object to send back with a message and the id of the document that was removed
          // You can really do this however you want, though.
          if (tour == null){
            return res.status(200).json({"message": `Tour ${tourid} not found`});
          } else {
            return res.status(200).json({"message": `Tour ${tourid} successfully deleted`});
          }
      });
};

exports.addPoint = (req, res) => {
  var tourid = req.params.tourid,
      pointid = req.params.pointid;
  var isInArray = { point_list : {$ne: pointid} } //check if value not in array
  var conditions =  { $push: {points_list: [pointid] }  }

  console.log("tourid = " + req.params.tourid);
  console.log("pointid = " + req.params.pointid);
  console.log(conditions);
  Tour.findByIdAndUpdate(tourid, isInArray,conditions,
        (err, tour) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
            else {
                console.log(`Updated tour: ${tour}`)
                res.status(200).json(tour);
            }
          });
}
