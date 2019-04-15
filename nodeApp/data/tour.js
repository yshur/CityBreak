'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    User = require('./schemas/user'),
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
			res.status(200).json(`{ err : ${err}`);
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
			res.status(200).json(`{ err : ${err}`);
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
			res.status(200).json(`{ err : ${err}`);
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
			res.status(200).json(`{ err : ${err}`);
		}
		console.log(tours);
		res.status(200).json(tours);
	});
};

// http://localhost:3000/getAreaPoints/34.7480/32.0973/32.0488/34.8498
exports.getAreaPoints = (req, res) => {
	var lngEast = Number(req.params.lngEast);
	var latNorth = Number(req.params.latNorth);
	var latSouth = Number(req.params.latSouth);
	var lngWest = Number(req.params.lngWest);
	
	var query = {
		"location.lat":{$lt: latNorth, $gt:latSouth},
		"location.lng":{$gt: lngEast, $lt:lngWest}
		};
	console.log(query);
	var q = Tour.find(query,
		{"id":1,"source":1,"lengthInKm":1,"description":1,"imagesUrls":1,"title":1,"category":1,"location":1 }
		).sort({"location.lat": 1 }).limit(20);
	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
		}
		// console.log(tours);
		createRouteFromPoints(req, res, tours);
	});
};
function returnPoints(req, res, points) {
	res.status(200).json(points);
};
// http://localhost:3000/getAreaPoints/34.7480/32.0973/32.0488/34.8498
function createRouteFromPoints(req, res, points) {
	var locations = [];
	// var length = 0;
	// console.log(typeof(points));
	for (let index = 0; index < points.length; index++) {
		var item = JSON.stringify(points[index]);
		item = JSON.parse(item);
		// let item = points[index];
		
		console.log(typeof(item));
		// console.log(JSON.stringify(item))
		// console.log(item);
		let lc = item.location;
		locations[index] = {
			title:	item.title,
			lat: 	lc.lat,
			lng:	lc.lng
		}
	}
	
	// res.status(200).json(locations);
	// Init API connector + Get the tour
	RouteXL_API_Connector(req, res, locations);	
};
function RouteXL_API_Connector(req, res, locations) {
	var headers = {
		'Content-Type': 'application/json'
	}
	var auth = {
		username: 'rshmueli',
		password: 'Citybreak2019!'
	}
	console.log(auth);
	axios.post("https://api.routexl.nl/tour", {locations: locations },
		{headers: headers, auth:auth }	)
	  .then(function (response) {
		console.log(response);
		res.status(200).json(response);
	  })
	  .catch(function (error) {
		console.log(error);
		res.status(200).json(`{ err : ${error}`);
	  });
	
}

exports.getTitles = (req, res) => {
    console.log('getTitles');
	var q = Tour.distinct( "title" );
	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
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
			res.status(200).json(`{ err : ${err}`);
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
