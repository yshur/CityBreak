'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    User = require('./schemas/user'),
    Tour = require('./schemas/tour');

exports.getCategories = (req, res) => {
    console.log('getCategories');
	var q = Tour.distinct( "category" );

	q.exec(function(err, categories)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		console.log(categories);
		res.status(200).json(categories);
	});
};
exports.getRandomTours = (req, res) => {
    console.log('getRandomTours');
	var q = Tour.find().limit(2);
	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
		}
		console.log(tours);
		res.status(200).json(tours);
	});
};
exports.getLongTours = (req, res) => {
    console.log('getLongTours');
	var q = Tour.find({"isRoute": true,"source": { $not: { $eq: "Jeepolog" } } }).limit(2);
	q.exec(function(err, tours)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
		}
		console.log(tours);
		res.status(200).json(tours);
	});
};
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
