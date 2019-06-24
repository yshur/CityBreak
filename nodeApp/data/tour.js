'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    url = require('url'),
    axios = require('axios'),
    consts = require('./consts')
    User = require('./schemas/user'),
    Tour = require('./schemas/tour'),
    Point = require('./schemas/point'),
    point_manager = require('./point');

exports.createTour = (req, res) => {
    var newTour = new Tour({
        name:       req.body.name,
        creator:    req.body.creator,
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
function getTourById(tourid, callback) {
    console.log(`getTourById: tourid = ${tourid}`);
    Tour.findById(tourid,
        (err, tour) => {
            callback(err, tour);
        }
    )
};
function updateWholeTourById(tourid, tour, req, res) {
    console.log(`updateWholeTourById: tourid = ${tourid}`);
    var conditions = {"_id": tourid}
    var update = tour;
    var opts = {
        new: true
    };
    Tour.updateOne(conditions, update, opts,
      (err, result) => {
          if(err) {
              console.log(`err: ${err}`);
              res.status(300).json(err);
          } else {
              console.log(`Updated tour: ${tour}`)
              res.status(200).json(tour);
          }
      });
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
exports.addPoint = (req, res) => {
  var tourid = req.params.tourid,
      pointid = req.params.pointid;
  getTourById(tourid, (err, tour) => {
      if(err) {
          console.log(`err: ${err}`);
          res.status(300).json(err);
      }
      go_over_point_list_on_add(tour, pointid, (err, tour) => {
        if(err) {
            console.log(`err: ${err}`);
            res.status(300).json(err);
        } else {
          point_manager.getPointById(pointid, (err, new_point) => {
                if(err) {
                    console.log(`err: ${err}`);
                    res.status(300).json(err);
                } else {
                  if(tour.points_list.length == 0) {
                    addFirstPoint(tour, new_point, (err, tour) => {
                      if(err) {
                          console.log(`err: ${err}`);
                          res.status(300).json(err);
                      } else {
                          updateWholeTourById(tourid, tour, req, res);
                      }
                    })
                  } else {
                    var index = tour.points_list.length-1;
                    var last_point_id = tour.points_list[index].point;
                    point_manager.getPointById(pointid, (err, last_point) => {
                      if(err) {
                          console.log(`err: ${err}`);
                          res.status(300).json(err);
                      } else {
                        addPointToEnd(tour, last_point, new_point, (err, tour) => {
                          if(err) {
                              console.log(`err: ${err}`);
                              res.status(300).json(err);
                          } else {
                              updateWholeTourById(tourid, tour, req, res);
                          }
                        })
                      }
                    });
                  }
                }
            });
        }
      });
  });
}
exports.rmPoint = (req, res) => {
  console.log(`rmPoint: tourid = ${req.params.tourid}`);
  var tourid = req.params.tourid,
      pointid = req.params.pointid;
  getTourById(tourid, (err, tour) => {
      if(err) {
          console.log(`err: ${err}`);
          res.status(300).json(err);
      }
      go_over_point_list_on_rm(tour, pointid, (err, tour) => {
        if(err) {
            console.log(`err: ${err}`);
            res.status(300).json(err);
        } else {
            console.log(tour);
            updateWholeTourById(tourid, tour, req, res);
        }
      });
    });
}
function go_over_point_list_on_rm(tour, pointid, callback) {
  console.log(`go_over_point_list_on_rm: pointid = ${pointid}`);
  var new_points_list = [];
  tour.points_list.map(function(pointItem){
    console.log(pointItem);
    if(pointItem.point != pointid) {
      pointItem.order = new_points_list.length;
      new_points_list.push(pointItem);
    } else {
      console.log("match");
      if(pointItem.order == (tour.points_list.length-1)) { // last one
        console.log("last one");
        tour.duration -= (pointItem.duration_way+pointItem.duration_stay);
        tour.distance -= pointItem.distance;
      } else if(pointItem.order == 0) { // first one
        console.log("first one");
        tour.duration -= (pointItem.duration_stay+tour.points_list[1].duration_way);
        tour.points_list[1].duration_way = 0;
        tour.distance -= tour.points_list[1].distance;
        tour.points_list[1].distance = 0;
      } else { // point in the middle
        console.log("point in the middle");
        var index = pointItem.order;
        point_manager.getPointById(tour.points_list[index-1].point,
          (err, before_point) => {
          if(err) {
              callback(err);
          } else {
            point_manager.getPointById(tour.points_list[index+1].point,
              (err, after_point) => {
              if(err) {
                  callback(err);
              } else {
                calculate_distance(before_point, after_point,
                  (err, result) => {
                  if(err) {
                      callback(err);
                  } else {
                    tour.duration = tour.duration-tour.points_list[index+1].duration_way+result.duration;
                    tour.distance = tour.distance-tour.points_list[index+1].distance+result.distance;
                    tour.points_list[index+1].duration_way = result.duration;
                    tour.points_list[index+1].distance = result.distance;
                    for(var i=index; i<tour.points_list.length-1; i++) {
                      tour.points_list[i] = tour.points_list[i+1];
                      tour.points_list[i].order = i;
                    }
                  }
                });
              }
          });
        }

    });
      }
    }
  });
  tour.points_list = new_points_list;
  callback(null, tour);
}
function go_over_point_list_on_add(tour, pointid, callback) {
  console.log(`go_over_point_list_on_add: pointid = ${pointid}`);
  var found = false;
  tour.points_list.map(function(pointItem){
    console.log(pointItem);
    if(pointItem.point == pointid) {
      callback(`point ${pointid} already exist`);
    }
  });
  callback(null, tour);
}
function addFirstPoint(tour, point, callback) {
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
  tour.update_time = Date.now();
  tour.map_url = null;
  callback(null, tour);
}
function addPointToEnd(tour, last_point, new_point, callback) {
  var order = tour.points_list.length;
  var result = calculate_distance(last_point, new_point, (err, result) => {
    if(err) {
        callback(err);
    } else {
      var pointItem = {
        order: order,
        distance: result.distance,
        duration_way: result.duration,
        duration_stay: new_point.duration,
        point: new_point._id
      };
      tour.points_list.push(pointItem);
      tour.duration += (pointItem.duration_way+pointItem.duration_stay);
      new_point.tags.map(function(tag){
        if(tour.tags.indexOf(tag) < 0) {
          tour.tags.push(tag);
        }
      });
      if(new_point.accessibility == false) {
        tour.accessibility = false;
      }
      tour.update_time = Date.now();
      callback(null, tour);
    }
  });
}
function calculate_distance(p1, p2, callback) {
  console.log("calculate_distance");
  var url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${p1.latitude},${p1.longitude}&destinations=${p2.latitude},${p2.longitude}&departure_time=now&key=${consts.GOOGLE_API_KEY}`;
  console.log(url);
  axios.get(url)
    .then(response => {
      console.log(response.data.rows[0].elements[0]);
      var result = {};
      var api_result = response.data.rows[0].elements[0];
      if(!api_result.duration) {
        callback(api_result.status);
      } else {
        result.duration = (api_result.duration.value/60).toFixed(2);
        result.distance = (api_result.distance.value/1000).toFixed(2);
        callback(null, result);
      }
    })
    .catch(error => {
      console.log(error);
      callback(error);
    });
}
function get_map_url(tour){
  tour.points_list.map(function(pointItem){
    point = point_manager.getPointById(pointItem.point);
  });
}
