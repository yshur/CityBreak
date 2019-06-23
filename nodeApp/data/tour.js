'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    url = require('url'),
    axios = require('axios'),
    consts = require('./consts')
    User = require('./schemas/user'),
    Tour = require('./schemas/tour'),
    Point = require('./schemas/point');

exports.createTour = (req, res) => {
    var newTour = new Tour({
        name:       req.body.name,
        about:      req.body.about
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
      "distance":1,"area":1,"sub_area":1,"accessibility":1
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
exports.getTourById = (tourid) => {
    console.log(`getTourById: tourid = ${tourid}`);
    Tour.findById(tourid,
        (err, tour) => {
            if (err) {
                console.log(`err: ${err}`);
                return err;
            }
            // console.log(tour);
            return tour;
        }
    )
};
exports.updateWholeTourById = (tourid, tour) => {
    console.log(`updateWholeTourById: tourid = ${tourid}`);
    var conditions = {"_id": tourid}
    var update = tour;
    var opts = {
        new: true
    };
    Tour.update(conditions, update, opts,
        (err, tour) => {
            if (err) {
                console.log(`err: ${err}`);
                return err;
            }
            // console.log(tour);
            return tour;
        }
    )
};
exports.updateTour = (req, res) => {
	var tourid = req.params.tourid;
	console.log(`updateTour: tourid = ${req.params.tourid}`);
  var params = req.body;
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
exports.addFirstPoint = (tour, point) => {
  var pointItem = {
    order: 0,
    distance: 0,
    duration_way: 0,
    duration_stay: point.duration,
    point: point._id
  };
  tour.points_list.push(pointItem);
  tour.duration = point.duration;
  tour.tags = point.tags;
  tour.loc = point.loc;
  tour.accessibility = point.accessibility;
  tour.area = point.area;
  tour.sub_area = point.sub_area;
  tour.image_url = point.image_url;
  tour.update_time = Date.now;
  tour.map_url = null;

  var update =  tour;
  var opts = {
      new: true
  };
  Tour.findByIdAndUpdate(tourid, update, opts,
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
exports.addLastPoint = (req, res) => {
  var tourid = req.params.tourid,
      pointid = req.params.pointid;
  var tour = getTourById(tourid);
  if(tour instanceof Error) {
    res.status(300).json(tour);
  }
  var point = Point.getPointById(pointid);
  if(point instanceof Error) {
    res.status(300).json(point);
  }
  var order = tour.points_list.length + 1;
  var dur_point = point.duration;

  // if point is first => set image_url, loc, area, sub_area
  // set duration, distance, tags, update_time,
  var update =  { $addToSet: { points_list: pointid }  };
  var opts = {
      new: true
  };
  Tour.findByIdAndUpdate(tourid, update, opts,
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
exports.rmPoint = (req, res) => {
  var tourid = req.params.tourid,
      pointid = req.params.pointid;
  var update =  { $pull: {points_list: { $in: [pointid] } } };
  var opts = {
      new: true
  };
  Tour.findByIdAndUpdate(tourid, update, opts,
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

function calculate_distance(p1, p2) {
  var result = {duration: 0, distance: 0 };
  axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Boston,MA&destinations=Lexington,MA&departure_time=now&key='+consts.GOOGLE_API_KEY)
    .then(response => {
      console.log(response.rows);
      var api_result = response.rows[0].elements[0];
      result.duration = (api_result.duration.value/60).toFixed(2);
      result.distance = (api_result.distance.value/1000).toFixed(2);
    })
    .catch(error => {
      console.log(error);
    });
}
