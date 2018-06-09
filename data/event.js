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
exports.getEvent = (req, res) => {};
exports.updateEvent = (req, res) => {};

exports.createEvent = (req, res) => {
    var name = req.body.name;
    var decription = req.body.decription;
    var time = req.body.time;
    var creator = req.body.creator;
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
    
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newEvent = new Event({
                name: name,
                decription: decription,
                time: Date.now(),
                //creator: user_id, 
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
                        res.status(200).json(newEvent);
                        //mongoose.disconnect();
                    }
                });
        },
        err =>{
            console.log(`connection error: ${err}`);
        }
    );
};
