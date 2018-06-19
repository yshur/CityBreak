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
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
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
        opts = {
            runValidators: true,
            multi: true
        };
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
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
            opts = {
            runValidators: true,
            multi: true
        };
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
            else {
                console.log(`Updated event: ${event}`)
                res.status(200).json(event);
            }
        });    
};
exports.addCategoryEvent = (req, res) => {
    var eventid = req.body.eventid,
        category = req.body.category;

    var conditions = {$push:{category: category} }
        opts = {
            runValidators: true,
            multi: true
        };
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
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

    var conditions = { $push: { equipment: {
        equipmentName: equipment, 
        max_quantity: max_quantity,
        min_quantity: min_quantity } } }
        opts = {
            runValidators: true,
            multi: true
        };
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
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
    var conditions = { $push: { chat: {
            userid: userid, 
            text: message } } }
        opts = {
            runValidators: true,
            multi: true
        };
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
            else {
                console.log(`Updated chat: ${event.chat}`)
                res.status(200).json(event.chat);
            }
        });     
};

exports.inviteUser = (req, res) => {
    var eventid = req.body.eventid,
        userid = req.body.userid,
        status = req.body.status;
    console.log('inviteUser');
    console.log(`get: eventid = ${req.body.eventid},
        userid = ${req.body.userid},
        status = ${req.body.status}`);   
    var conditions = { $push: { participants: {
            userid: userid, 
            status: status } } }
        opts = {
            runValidators: true,
            multi: true
        };
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            }
            else {
                console.log(`Updated event: ${event}`)
                res.status(200).json(event);
            }
        });       
};
exports.setUserEquip = (req, res) => {
    var eventid = req.body.eventid,
        userid = req.body.userid,
        equip_name = req.body.equip_name,
        quantity = req.body.quantity;
    console.log('sendMessage');
    console.log(`post: eventid = ${req.body.eventid},
        userid = ${req.body.userid},
        equip_name = ${req.body.equip_name},
        quantity = ${req.body.quantity}`);    
    var conditions = { participants: {
        $in:{userid:userid}, 
        userEquipments: {  
            equipmentName: equip_name, quantity:quantity }
        } } 
        opts = {
            runValidators: true,
            multi: true
        };
    Event.findByIdAndUpdate(eventid, conditions, opts,
        (err, event) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Updated event: ${event}`)
                res.status(200).json(event);
            }
        });   
};
exports.deleteEvent = (req, res) => {
    var eventid = req.body.eventid;
    var conditions = {_id: eventid};

    User.remove(conditions,
        (err) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Removed document`);
                User.findOne({_id: eventid},
                    (err) => {
                        console.log(`Removed event id=${eventid} `);
                        res.status(200).json({result:`Removed ${eventid}`});
                    });
            };
        });
};