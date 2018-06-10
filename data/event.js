'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    consts = require('./consts'),
    User = require('./schemas/user'),
    Event = require('./schemas/event'),
    Category = require('./schemas/category'),
    Equipment = require('./schemas/equipment'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };
exports.getAllEvents = (req, res) => {
    console.log('getAllEvents');
    // return data;
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Event.find( {},
                (err, event) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(event);
                    res.status(200).json(event);
                   // mongoose.disconnect();
                }
            )
        }, 
        err => {
            console.log(`connection error: ${err}`);
            res.status(200).json(`{ connection error : ${err}`); 
        }
    );   
};
exports.getEvent = (req, res) => {
    var eventid = req.params.eventid;
    console.log('getEvent');
    console.log(`get: eventid = ${req.params.eventid}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Event.findOne( { _id: { $eq: eventid } },
                (err, event) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(event);
                    res.status(200).json(event);
                   // mongoose.disconnect();
                }
            )
        }, 
        err => {
            console.log(`connection error: ${err}`);
            res.status(200).json(`{ connection error : ${err}`); 
        }
    );
};
exports.createEvent = (req, res) => {
    var name = req.body.name,
        decription = req.body.decription,
        time = req.body.time,
        creator = req.body.creator,
        place = req.body.place,
        category = req.body.category;
    console.log('createEvent');
    console.log(`post: name = ${req.body.name},
        decription = ${req.body.decription},
        time = ${req.body.time},
        creator = ${req.body.creator},
        place = ${req.body.place},
        category = ${req.body.category}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newEvent = new Event({
                name: name,
                decription: decription,
                time: time,
                creator: creator,
                place: place,
                category: category
            });
            newEvent.save(
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
                        console.log(`Saved document: ${newEvent}`);
                        res.status(200).json(newEvent);
                        mongoose.disconnect();
                    }
                });
        },
        err =>{
            console.log(`connection error: ${err}`);
        }
    );
};
