'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    url = require('url'),
    axios = require('axios'),
    consts = require('./consts')
    User = require('./schemas/user'),
    Tour = require('./schemas/tour'),
    Point = require('./schemas/point'),
    Session = require('./session'),
    point_manager = require('./point'),
    user_manager = require('./user');

exports.createTour = (req, res) => {
  console.log("createTour");
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else{
      var newTour = new Tour({
        name:       req.body.name,
        creator:    req.header('user_id'),
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
  //  }
 // });
};
exports.getTours = (req, res) => {
    console.log('getTours');
    var limit = 0;
    var queryData = url.parse(req.url, true).query;
    var params = {};
    var show = {
      "_id":1, "name":1,"about":1,"tags":1,"duration":1,
      "distance":1,"area":1,"sub_area":1,"image_url":1
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
    var q = Tour.find(params, show);
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
function updateTourById(tourid, update, req, res) {
    console.log(`updateTourById: tourid = ${tourid}`);
    var conditions = {"_id": tourid}
    var opts = { new: true };
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
  console.log("updateTour");
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else {
    	var tourid = req.params.tourid;
    	console.log(`updateTour: tourid = ${req.params.tourid}`);
      var params = {};
      if (req.body.name) {
        params.name = req.body.name;
      }
      if (req.body.about) {
        params.about = req.body.about;
      }
      isCreator(tourid, req.header('user_id'), (err, tour) => {
        if(err) {
            console.log(`err: ${err}`);
            res.status(300).json(err);
        } else if(tour != null) {
          updateTourById(tourid, params, req, res);
        } else {
          user_manager.isAdmin(req.header('user_id'), (err, user) => {
            if (err) return res.status(300).json(err);
            if (user == null) {
              return res.status(300).json("You have no permissions");
            } else {
              updateTourById(tourid, params, req, res);
            }
          });
        }
      });
    }
  });
};
exports.deleteTour = (req, res) => {
  console.log("deleteTour");
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else {
      console.log(`deleteTour: tourid = ${req.params.tourid}`);
      var tourid = req.params.tourid;
      isCreator(tourid, req.header('user_id'), (err, tour) => {
        if(err) {
            console.log(`err: ${err}`);
            res.status(300).json(err);
        } else if(tour != null) {
          removeTour(tourid, req, res);
        } else {
          user_manager.isAdmin(req.header('user_id'), (err, user) => {
            if (err) return res.status(300).json(err);
            if (user == null) {
              return res.status(300).json("You have no permissions");
            } else {
              removeTour(tourid, req, res);
            }
          });
        }
      });
    }
  });
};
function removeTour(tourid, req, res){
  Tour.removeOne(tourid, (err, tour) => {
      if (err) return res.status(300).json(err);
      return res.status(200).json({"message": `Tour ${tourid} successfully deleted`});
    });
}
exports.addPoint = (req, res) => {
  console.log("addPoint");
 // Session.checkActiveSession(req, (err, result) => {
//    if(err) {
 //       console.log(`err: ${err}`);
//        res.status(300).json(err);
 //   } else{
      var tourid = req.params.tourid,
        pointid = req.params.pointid;
      console.log(`addPoint: tourid=${tourid}, pointid=${pointid}`);
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
                          updateTourById(tourid, tour, req, res);
                      }
                    })
                  } else {
                    var index = tour.points_list.length-1;
                    var last_coords = tour.points_list[index].coords;
                    addPointToEnd(tour, last_coords, new_point, (err, tour) => {
                      if(err) {
                          console.log(`err: ${err}`);
                          res.status(300).json(err);
                      } else {
                          updateTourById(tourid, tour, req, res);
                      }
                    });
                  }
                }
            });
          }
        });
      });
 //   }
//  });
}
exports.rmPoint = (req, res) => {
  console.log("rmPoint");
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else{
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
                updateTourById(tourid, tour, req, res);
            }
          });
        });
      }
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
        let new_duration = tour.duration-pointItem.duration_way-pointItem.duration_stay;
        tour.duration = new_duration;
        let new_distance = tour.distance-pointItem.distance;
        tour.distance = new_distance;
      } else if(pointItem.order == 0) { // first one
        console.log("first one");
        let new_duration = tour.duration-pointItem.duration_way-pointItem.duration_stay;
        tour.duration = new_duration;
        let new_distance = tour.distance-pointItem.distance;
        tour.distance = new_distance;
        tour.points_list[1].duration_way = 0;
        tour.points_list[1].distance = 0;
      } else { // point in the middle
        console.log("point in the middle");
        var index = pointItem.order;
        var first_coords = tour.points_list[index-1].coords;
        var second_coords = tour.points_list[index+1].coords;
        calculate_distance(first_coords, second_coords,
          (err, result) => {
          if(err) {
              callback(err);
          } else {
            let new_duration = tour.duration-tour.points_list[index+1].duration_way+result.duration;
            tour.duration = new_duration;
            let new_distance = tour.distance-tour.points_list[index+1].distance+result.distance;
            tour.distance = new_distance;
            tour.points_list[index+1].duration_way = result.duration;
            tour.points_list[index+1].distance = result.distance;
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
    coords: `${point.latitude},${point.longitude}`,
    name: point.name,
    point: point._id
  };
  tour.points_list.push(pointItem);
  tour.duration = point.duration;
  tour.tags = point.tags;
  tour.loc = point.loc;
  tour.accessibility = point.accessibility;
  tour.area = point.area;
  tour.sub_area = point.sub_area;
  tour.image_url = point.image_url[0];
  tour.update_time = Date.now();
  tour.map_url = null;
  callback(null, tour);
}
function addPointToEnd(tour, first_coords, new_point, callback) {
  var order = tour.points_list.length;
  var new_coords = `${new_point.latitude},${new_point.longitude}`;
  var result = calculate_distance(first_coords, new_coords, (err, result) => {
    if(err) {
        callback(err);
    } else {
      var pointItem = {
        order: order,
        distance: result.distance,
        duration_way: result.duration,
        duration_stay: new_point.duration,
        coords: new_coords,
        name: new_point.name,
        point: new_point._id
      };
      tour.points_list.push(pointItem);
      console.log(pointItem);
      console.log(`tour.duration before = ${tour.duration}`);
      console.log(pointItem.duration_way+pointItem.duration_stay);
      tour.duration = tour.duration+Number(pointItem.duration_way)+Number(pointItem.duration_stay);
      console.log(`tour.duration = ${tour.duration}`);
      console.log(`tour.distance before = ${tour.distance}`);
      console.log(pointItem.distance);
      tour.distance = tour.distance+Number(pointItem.distance);
      console.log(`tour.distance = ${tour.distance}`);
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
function calculate_distance(first_coords, second_coords, callback) {
  console.log("calculate_distance");
  var url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${first_coords}&destinations=${second_coords}&departure_time=now&key=${consts.GOOGLE_API_KEY}`;
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
exports.owner = (tour_id, callback) => {
  var show = {
    "creator":1
    };
  User.findById(tour_id, show,
    (err, user) => {
        callback(err, user);
    });
};
exports.updateIsDone = (req, res) => {
  console.log("updateIsDone");
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else{
      var tourid = req.params.tourid,
        status = req.params.status==1 ? true : false;
    	console.log(`updateIsDone: tourid=${req.params.tourid}, status=${status}`);
      var params = {is_done: status};
      var opts = { new: true };
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
    }
  });
}
exports.updateIsPublic = (req, res) => {
  console.log("updateIsPublic");
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else {
      var tourid = req.params.tourid,
        status = req.params.status==1 ? true : false;
    	console.log(`updateIsPublic: tourid=${req.params.tourid}, status=${status}`);
      var update = {is_public: status};
      var params = {_id: tourid, is_done: true}
      var opts = { new: true };
      console.log(params);
      Tour.findOneAndUpdate(params, update, opts,
        (err, tour) => {
          if(err) {
              console.log(`err: ${err}`);
              res.status(300).json(err);
          } else {
              console.log(`Updated tour: ${tour}`)
              res.status(200).json(tour);
          }
      });
    }
  });
}
exports.updateVisitTour = (req, res) => {
  console.log("updateVisitTour");
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else{
      var tourid = req.params.tourid;
    	console.log(`updateVisitTour: tourid=${req.params.tourid}`);
      var content = req.body.content;
      var new_visit = {
        user: req.header('user_id')
      };
      var update = {$push: {visitors:new_visit}};
      var opts = { new: true };
      Tour.findByIdAndUpdate(tourid, update, opts,
        (err, tour) => {
          if(err) {
              console.log(`err: ${err}`);
              res.status(300).json(err);
          } else {
              console.log(`Updated tour: ${tour}`)
              res.status(200).json(tour);
          }
      });
    }
  });
}
exports.scoreTour = (req, res) => {
  console.log("scoreTour");
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else {
      var tourid = req.params.tourid,
        score = req.params.score;
      console.log(`scoreTour: tourid=${req.params.tourid}, score=${score}`);
      if(score < 1 || score > 5) {
        res.status(300).json("score invalid");
      } else {
        getTourById(tourid, (err, tour) => {
          if(err) {
            console.log(`err: ${err}`);
            res.status(300).json(err);
          } else {
            var new_score = {
              content: score,
              user: req.header('user_id')
            }
            var count = tour.scores.length * tour.score;
            tour.scores.push(new_score);
            tour.score = ((count+score)/tour.scores.length).toFixed(2);
            var update = {scores: tour.scores, score: tour.score}
            var opts = { new: true };
            var conditions = {_id:tourid};
            console.log(update);
            Tour.updateOne(conditions, update, opts,
              (err, tour) => {
                if(err) {
                    console.log(`err: ${err}`);
                    res.status(300).json(err);
                } else {
                    console.log(`Updated tour: ${tour}`)
                    res.status(200).json(tour);
                }
            });
          }
        });
      }
    }
  });
}
exports.feedbackTour = (req, res) => {
  console.log("feedbackTour");
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else {
      var content = req.body.content;
      var new_feedback = {
        content: content,
        user: req.header('user_id')
      };
      var update = {$push: {feedbacks:new_feedback}};
      var opts = { new: true };
      Tour.findByIdAndUpdate(tourid, update, opts,
        (err, tour) => {
          if(err) {
              console.log(`err: ${err}`);
              res.status(300).json(err);
          } else {
              console.log(`Updated tour: ${tour}`)
              res.status(200).json(tour);
          }
      });
    }
  });
}
function isCreator(tourid, user_id, callback) {
  var show = {
    "creator":1
    };
  var conditions = {_id:tourid, creator:user_id};
  Tour.findById(conditions, show,
    (err, tour) => {
        callback(err, tour);
    });
};
