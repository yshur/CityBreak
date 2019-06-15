'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    User = require('./schemas/user'),
    Tour = require('./schemas/tour'),
    Point = require('./schemas/point');


exports.createTour = (req, res) => {
    var newTour = new Tour({
        name:       req.body.name,
        creator:    req.body.creator,
        area: 			req.body.area,
        start_point: req.body.start_point
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
exports.getTours = (req, res) => {
    console.log('getTours');
    // return data;
    Tour.find( {},
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
exports.addPoint = (req, res) => {
  var tourid = req.params.tourid,
      pointid = req.params.pointid;
  var isInArray = { point_list : {$ne: pointid} } //check if value not in array
  var conditions =  { $push: {points_list: [pointid] }  }

  console.log("tourid = " + req.params.tourid);
  console.log("pointid = " + req.params.pointid);
  console.log(conditions);
  Tour.findByIdAndUpdate(tourid, conditions,isInArray,
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
exports.getNorthTours = (req, res) => {
    console.log('getNorthTours');
	var q = Tour.find({"isRoute": true,"source": { $not: { $eq: "Jeepolog" } },"location.lat": { $gt: 32.540422 } },
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
exports.getSouthTours = (req, res) => {
    console.log('getSouthTours');
	var q = Tour.find({"isRoute": true,"source": { $not: { $eq: "Jeepolog" } },"location.lat": { $lt: 31.864304 } },
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
exports.getCenterTours = (req, res) => {
    console.log('getCenterTours');
	var q = Tour.find({"isRoute": true,"source": { $not: { $eq: "Jeepolog" } },"location.lat": { $lt: 32.540422, $gt: 31.864304 } },
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
// exports.deleteTour = (req, res) => {
//     var tourid = req.body.tourid;
//     var conditions = {_id: tourid};
//
//     Tour.remove(conditions,
//         (err) => {
//             if(err){
//                 console.log(`err: ${err}`);
//                 res.status(300).json(err);
//             } else {
//                 console.log(`Removed document`);
//                 User.findOne({_id: tourid},
//                     (err) => {
//                         console.log(`Removed tour id=${tourid} `);
//                         res.status(200).json({result:`Removed ${tourid}`});
//                     });
//             };
//         });
// };
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
