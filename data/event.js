'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    User = require('./schemas/user'),
    Event = require('./schemas/event'),
    Category = require('./schemas/category');

exports.getAllEvents = (req, res) => {
    console.log('getAllEvents');
    Event.find( {},
        (err, event) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(event);
            res.status(200).json(event);
        }
    );
};
exports.getEvent = (req, res) => {
    var eventid = req.params.eventid;
    console.log('getEvent');
    console.log(`get: eventid = ${req.params.eventid}`);

    Event.findOne( { _id: { $eq: eventid } },
        (err, event) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(event);
            res.status(200).json(event);
        }
    );
};
exports.createEvent = (req, res) => {
    var name = req.body.name,
        description = req.body.description,
        time = req.body.time,
        creator = req.body.creator,
        place = req.body.place,
        category = req.body.category;
    console.log('createEvent');
    console.log(`post: name = ${req.body.name},
        description = ${req.body.description},
        time = ${req.body.time},
        creator = ${req.body.creator},
        place = ${req.body.place},
        category = ${req.body.category}`);

    var newEvent = new Event({
        name: name,
        description: description,
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
            }
        });
};

exports.setTimeEvent = (req, res) => {
    var eventid = req.body.eventid,
        time = req.body.time;

    var conditions = {time: time}
    opts = {multi: true};
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err)
                console.log(`err: ${err}`);
            else {
                console.log(`Updated event: ${event}`)
                res.status(200).json(event);
            }
        });    
};
exports.setPlaceEvent = (req, res) => {
    var eventid = req.body.eventid,
        place = req.body.place;

    var conditions = {place: place}
    opts = {multi: true};
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err)
                console.log(`err: ${err}`);
            else {
                console.log(`Updated event: ${event}`)
                res.status(200).json(event);
            }
        });    
};
exports.setEqEvent = (req, res) => {
    var eventid = req.body.eventid,
        equipment = req.body.equipment,
        max_quantity = req.body.max_quantity,
        min_quantity = req.body.min_quantity;

    var conditions = { $push: { equipment: {equipment, max_quantity, min_quantity } } }
        opts = {multi: true};
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err)
                console.log(`err: ${err}`);
            else {
                console.log(`Updated event: ${event}`)
                res.status(200).json(event);
            }
        }); 
};


exports.getChat = (req, res) => {
    var eventid = req.params.eventid;
    console.log('getChat');
    console.log(`get: eventid = ${req.params.eventid}`);

    Event.findOne( { _id: { $eq: eventid } },
        (err, event) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(event.chat);
            res.status(200).json(event.chat);
        }
    );

};

exports.sendMessage = (req, res) => {
    var eventid = req.body.eventid,
        userid = req.body.userid,
        message = req.body.message;
    console.log('sendMessage');
    console.log(`post: eventid = ${req.body.eventid},
        userid = ${req.body.userid},
        message = ${req.body.message}`);
};
exports.inviteUser = (req, res) => {
    var eventid = req.params.eventid,
        userid = req.params.userid;
    console.log('inviteUser');
    console.log(`get: eventid = ${req.body.eventid},
        userid = ${req.body.userid}`);
};
exports.approveUser = (req, res) => {
    var eventid = req.params.eventid,
        userid = req.params.userid;
    console.log('approveUser');
    console.log(`get: eventid = ${req.body.eventid},
        userid = ${req.body.userid}`);    
};
exports.setUserEquip = (req, res) => {
    var eventid = req.body.eventid,
        userid = req.body.userid,
        equip_name = req.body.equip_name,
        equip_amount = req.body.equip_amount;
    console.log('sendMessage');
    console.log(`post: eventid = ${req.body.eventid},
        userid = ${req.body.userid},
        equip_name = ${req.body.equip_name},
        equip_amount = ${req.body.equip_amount}`);    
};
