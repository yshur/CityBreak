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
        category = req.body.category,
        image = req.body.image;
    console.log('createEvent');
    console.log(`post: name = ${req.body.name},
        description = ${req.body.description},
        time = ${req.body.time},
        creator = ${req.body.creator},
        place = ${req.body.place},
        category = ${req.body.category},
        image = ${req.body.image}`
      );

    var newEvent = new Event({
        name: name,
        description: description,
        time: time,
        creator: creator,
        place: place,
        category: category,
        image: image
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
            multi: true,
            new: true
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
          multi: true,
          new: true
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
          multi: true,
          new: true
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
exports.addEqEvent = (req, res) => {
    var eventid = req.body.eventid,
        equipment = req.body.equipment;

    var conditions = { $push: { equipment: {
        name: equipment } } }
        opts = {
            runValidators: true,
            multi: true,
            new: true
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
            user: userid,
            text: message } } }
        opts = {
            runValidators: true,
            multi: true,
            new: true
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
        userid = req.body.userid;
    console.log('inviteUser');
    console.log(`post: eventid = ${req.body.eventid},
        userid = ${req.body.userid}`);

    var conditions = { $push: { participant: userid } }
        opts = {
            runValidators: true,
            multi: true,
            new: true
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
        equipmentid = req.body.equipmentid;
    console.log('setUserEquip');
    console.log(`post: eventid = ${req.body.eventid},
        userid = ${req.body.userid},
        equipmentid = ${req.body.equipmentid}`);

    var conditions = { $set: {
      userid: userid,
      current: true
      } }
        opts = {
            runValidators: true,
            multi: true,
            new: true
        };
    Event.findByIdAndUpdate({equipment:equipmentid}, conditions, opts,
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
