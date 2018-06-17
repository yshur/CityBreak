'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    User = require('./schemas/user'),
    Event = require('./schemas/event'),
    Category = require('./schemas/category');

exports.getAllEvents = (req, res) => {
    console.log('getAllEvents');
    // return data;
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
exports.createEventYair = (req, res) => {
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
            }
        });

};

exports.updateEvent = (req, res) => {};

exports.createEvent = (req, res) => {
    var name = req.body.name;
    var decription = req.body.decription;
    var time = req.body.time;
    var place = req.body.place;
    var participants = req.body.participants;
    var user_id = req.body.user_id;
    var status = req.body.status;
    var user_equipments = req.body.user_equipments;
    var equipment_id = req.body.equipment_id;
    var quantity = req.body.quantity;
    var category = req.body.category;
    var category1 = req.body.category1;
    var category2 = req.body.category2;
    var category3 = req.body.category3;
    var required_equipment = req.body.required_equipment;
    var equipment_id = req.body.equipment_id;
    var max_quantity = req.body.max_quantity;
    var min_quantity = req.body.min_quantity;

    var newEvent = new Event({
        name: name,
        decription: decription,
        time: time,
        creator: user_id,
        place: place,
        participants: [{
            user_id,
            status,
            user_equipments: [{
                equipment_id,
                quantity
            }]
        }],
        category: [
            category1, category2, category3
        ],
        required_equipment: [{
            equipment_id,
            max_quantity,
            min_quantity
        }]
    });
    newEvent.save(
        (err) => {
            if(err)
                console.log(`err: ${err}`);
            else {
                console.log(`Saved document: ${newEvent}`);
                res.status(200).json(newEvent);
                //mongoose.disconnect();
            }
        });

};


exports.getChat = (req, res) => {
    var eventid = req.params.eventid;
    console.log('getChat');
    console.log(`get: eventid = ${req.params.eventid}`);

    Event.findOne( { _id: { $eq: eventid } },
        (err, chat) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(event);
            res.status(200).json(event);
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
