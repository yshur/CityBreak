'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    User = require('./schemas/user'),
	Route = require('./schemas/route'),
	axios = require('axios'),
    Tour = require('./schemas/tour');

exports.getAllTours = (req, res) => {
    console.log('getAllTours');
	var q = Tour.find({"isRoute": true,"source": { $not: { $eq: "Jeepolog" } } },
		{"id":1,"source":1,"lengthInKm":1,"description":1,"imagesUrls":1,"title":1,"category":1,"location":1 }
		).limit(10);

	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		console.log(tours);
		res.status(200).json(tours);
	});
};
exports.getPoints = (req, res) => {
    console.log('getPoints');
	var q = Tour.find({"isRoute": false},
		{"id":1,"source":1,"lengthInKm":1,"description":1,"imagesUrls":1,"title":1,"category":1,"location":1 }
		).limit(20);
	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		console.log(tours);
		res.status(200).json(tours);
	});
};
exports.searchWordInDesc = (req, res) => {

	var value = req.params.value;
	console.log('searchWordInDesc: '+value);
	var q = Tour.find({$or:[
		{"description": {$regex : ".*"+value+".*"}},
		{"title": {$regex : ".*"+value+".*"}}
			]},
		{"id":1,"source":1,"lengthInKm":1,"description":1,"imagesUrls":1,"title":1,"category":1,"location":1 }
		).sort({"location.lat": 1 }).limit(20);
	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		console.log(tours);
		res.status(200).json(tours);
	});
};
exports.getAreaTours = (req, res) => {
	var value = req.params.value;
	var query = {};
	console.log('getAreaTours: '+value);
	switch(value) {
		case 'north':
			query = {"location.lat":{$gt:32.354013}};
			break;
		case 'south':
			query = {"location.lat":{$lt:31.729801}};
			break;
		case 'center':
			query = {"location.lat":{$gt:31.729801, $lt:32.354013}};
			break;
	}
	console.log('getAreaTours: '+query);
	var q = Tour.find(query,
		{"id":1,"source":1,"lengthInKm":1,"description":1,"imagesUrls":1,"title":1,"category":1,"location":1 }
		).limit(2);
	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		console.log(tours);
		res.status(200).json(tours);
	});
};
// http://localhost:3000/getAreaPoints/34.7480/32.0973/32.0488/34.8498
exports.createAreaPoints = (req, res) => {
	var lngCenter = Number(req.params.lngCenter);
	var latCenter = Number(req.params.latCenter);
	var name = req.params.name;
	var coords = {
		"lngCenter": lngCenter,
		"latCenter": latCenter
	}
	var query = {
		"location.lat":{$lt: latCenter+0.1, $gt:latCenter-0.1},
		"location.lng":{$gt: lngCenter-0.1, $lt:lngCenter+0.1}
		};
	// console.log(query);
	var q = Tour.find(query,
		{"id":1,"source":1,"lengthInKm":1,"description":1,"imagesUrls":1,"title":1,"category":1,"location":1 }
		).sort({"location.lat": 1 }).limit(10);
	q.exec(function(err, points)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		// console.log(points);
		createRouteFromPoints(res, points, coords, name);
		// returnPoints(req, res, points);
	});
};
// http://localhost:3000/getAreaPoints/34.7480/32.0973
exports.getAreaPoints = (req, res) => {
  var lngCenter = Number(req.params.lngCenter);
	var latCenter = Number(req.params.latCenter);
	var name = req.params.name;
	var coords = {
		"lngCenter": lngCenter,
		"latCenter": latCenter
	}
	var query = {
		"location.lat":{$lt: latCenter+0.1, $gt:latCenter-0.1},
		"location.lng":{$gt: lngCenter-0.1, $lt:lngCenter+0.1}
		};
	// console.log(query);
	var q = Tour.find(query,
		{"id":1,"source":1,"lengthInKm":1,"description":1,"imagesUrls":1,"title":1,"category":1,"location":1, "distance":Math.sqrt(Math.pow(latCenter-location.lat, 2) + Math.pow(lngCenter-location.lng, 2) ) }
		).sort({"location.lat": 1 }).limit(10);
	q.exec(function(err, points)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		// console.log(points);
		// createRouteFromPoints(res, points, coords, name);
		returnPoints(req, res, points);
	});
};
function returnPoints(res, points) {
	res.status(200).json(points);
};
// http://localhost:3000/getAreaPoints/34.7480/32.0973/32.0488/34.8498/jaffa
function createRouteFromPoints(res, points, coords, name) {
	var locations = [];
	var items = [];
	// var length = 0;
	// console.log(typeof(points));
	for (let index = 0; index < points.length; index++) {
		var item = JSON.stringify(points[index]);
		item = JSON.parse(item);
		let lc = item.location;
		locations[index] = {
			address: item.id,
			lat: 	lc.lat,
			lng:	lc.lng
		}
		items[item.id] = item;
	}

	// res.status(200).json(locations);
	// Init API connector + Get the tour
	RouteXL_API_Connector(res, locations, items, coords, name);
};
function RouteXL_API_Connector(res, locations, items, coords, name) {
	var data = 'locations='+JSON.stringify(locations);
	var auth = {
		username: 'rshmueli',
		password: 'Citybreak2019!'
	}
	axios({
		  method: 'post',
		  url: 'https://api.routexl.nl/tour',
		  data: data,
		  auth: auth
		}).then(function (response) {
		console.log(response.data);
		// res.status(200).json(response.data);
		createRoute(res, response.data, items, coords, name );
	  })
	  .catch(function (error) {
		console.log(error);
		res.status(200).json(`{ err : ${error} }`);
	  });

}
function createRoute(res, route, items, coords, routeName ) {
	var routeItems = route.route;
	for ( let index=0; index<route.count; index++) {
		let i = index.toString();
		console.log(routeItems[i]);
		let name = routeItems[i].name;
		item = items[name];
		routeItems[i].data = item;
		routeItems[i].name = item.title;
		console.log(routeItems[i]);
	}
    var newRoute = new Route({
		id: route.id,
		name: routeName,
		coords: coords,
        count: route.count,
		feasible: route.feasible,
		route: routeItems
	});
    newRoute.save(
        (err) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
            else {
                console.log(`Saved document: ${newRoute}`);
                res.status(200).json(newRoute);
            }
        });
};


exports.getTitles = (req, res) => {
    console.log('getTitles');
	var q = Tour.distinct( "title" );
	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		console.log(tours);
		res.status(200).json(tours);
	});
};
exports.getDescriptions = (req, res) => {
    console.log('getDescriptions');
	var q = Tour.distinct( "description" );
	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		console.log(tours);
		res.status(200).json(tours);
	});
};

exports.createTour = (req, res) => {
    var name = req.body.name,
        description = req.body.description,
        time = req.body.time,
        creator = req.body.creator,
        place = req.body.place,
        category = req.body.category,
        image = req.body.image;
    console.log('createTour');
    console.log(`post: name = ${req.body.name},
        description = ${req.body.description},
        time = ${req.body.time},
        creator = ${req.body.creator},
        place = ${req.body.place},
        category = ${req.body.category},
        image = ${req.body.image}`
      );

    var newTour = new Tour({
        name: name,
        description: description,
        time: time,
        creator: creator,
        place: place,
        category: category,
        image: image
    });
    newTour.save(
        (err) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
            else {
                console.log(`Saved document: ${newTour}`);
                res.status(200).json(newTour);
            }
        });
};
exports.setTimeTour = (req, res) => {
    var tourid = req.body.tourid,
        time = req.body.time;

    var conditions = {time: time}
        opts = {
            runValidators: true,
            multi: true,
            new: true
        };
    Tour.findByIdAndUpdate(tourid, conditions, opts,
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
};
exports.setPlaceTour = (req, res) => {
    var tourid = req.body.tourid,
        place = req.body.place;

    var conditions = {place: place}
      opts = {
          runValidators: true,
          multi: true,
          new: true
      };
    Tour.findByIdAndUpdate(tourid, conditions, opts,
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
};
exports.addCategoryTour = (req, res) => {
    var tourid = req.body.tourid,
        category = req.body.category;

    var conditions = {$push:{category: category} }
      opts = {
          runValidators: true,
          multi: true,
          new: true
      };
    Tour.findByIdAndUpdate(tourid, conditions, opts,
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
};
exports.addEqTour = (req, res) => {
    var tourid = req.body.tourid,
        equipment = req.body.equipment;

    var conditions = { $push: { equipment: {
        name: equipment } } }
        opts = {
            runValidators: true,
            multi: true,
            new: true
        };
    Tour.findByIdAndUpdate(tourid, conditions, opts,
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
};
exports.getChat = (req, res) => {
    var tourid = req.params.tourid;
    console.log('getChat');
    console.log(`get: tourid = ${req.params.tourid}`);

    Tour.findOne( { _id: { $eq: tourid } },
        (err, tour) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(tour.chat);
            res.status(200).json(tour.chat);
        }
    );

};
exports.sendMessage = (req, res) => {
    var tourid = req.body.tourid,
        userid = req.body.userid,
        message = req.body.message;
    console.log('sendMessage');
    console.log(`post: tourid = ${req.body.tourid},
        userid = ${req.body.userid},
        message = ${req.body.message}`);
    var conditions = { $push: { chat: {
            user: userid,
            text: message } } }
        opts = {
            runValidators: true,
            multi: true,
            new: true
        };
    Tour.findByIdAndUpdate(tourid, conditions, opts,
        (err, tour) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
            else {
                console.log(`Updated chat: ${tour.chat}`)
                res.status(200).json(tour.chat);
            }
        });
};
exports.inviteUser = (req, res) => {
    var tourid = req.body.tourid,
        userid = req.body.userid;
    console.log('inviteUser');
    console.log(`post: tourid = ${req.body.tourid},
        userid = ${req.body.userid}`);

    var conditions = { $push: { participant: userid } }
        opts = {
            runValidators: true,
            multi: true,
            new: true
        };
    Tour.findByIdAndUpdate(tourid, conditions, opts,
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
};
exports.setUserEquip = (req, res) => {
    var tourid = req.body.tourid,
        userid = req.body.userid,
        equipment = req.body.equipment;
    console.log('setUserEquip');
    console.log(`post: tourid = ${req.body.tourid},
        userid = ${req.body.userid},
        equipment = ${req.body.equipment}`);
    var conditions = { $push: {equipment: {
                name: equipment,
                userid: userid,
                current: true
              } } }
        opts = {
            runValidators: true,
            multi: true,
            new: true
        };
    Tour.findByIdAndUpdate(tourid, conditions, opts,
        (err, tour) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Updated tour: ${tour}`)
                res.status(200).json(tour);
            }
        });
};
exports.deleteTour = (req, res) => {
    var tourid = req.body.tourid;
    var conditions = {_id: tourid};

    Tour.remove(conditions,
        (err) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Removed document`);
                User.findOne({_id: tourid},
                    (err) => {
                        console.log(`Removed tour id=${tourid} `);
                        res.status(200).json({result:`Removed ${tourid}`});
                    });
            };
        });
};
exports.getUserTour = (req, res) => {
    var userid = req.body.userid;
    console.log('getUserTour');
    Tour.find( {participant: {$in:userid}},
        (err, tour) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(tour);
            res.status(200).json(tour);
        }
    );
};
