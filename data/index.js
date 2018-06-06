'use strice';//JS engine use strict parsing
// var data = require('./data.json');
var mongoose = require('mongoose'),
    consts = require('./consts'),
    User = require('./user'),
    Chat = require('./chat'),
    Event = require('./event'),
    Category = require('./category'),
    Equipment = require('./equipment'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

exports.getAllUsers = (req, res) => {
    console.log('getAllUsers');
    // return data;
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            User.find( {},
                (err, user) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(user);
                    res.status(200).json(user);
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
exports.createUser = (req, res) => {};
exports.getUser = (req, res) => {};

exports.createChat = (req, res) => {};
exports.getChat = (req, res) => {};

exports.getAllEquipments = (req, res) => {
    console.log('getAllEquipments');
    // return data;
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Equipment.find( {},
                (err, equipment) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(equipment);
                    res.status(200).json(equipment);
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
exports.getEquipmentsByCategory = (req, res) => {
    var category = req.params.category;
    console.log('getEquipmentsByCategory');
    console.log(`get: category = ${req.params.category}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Equipment.find( { categories: { $in: [category] } },
                (err, equipment) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(equipment);
                    res.status(200).json(equipment);
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
exports.createEquipment = (req, res) => {};

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
exports.createEvent = (req, res) => {};

exports.getBooksByCategory = (req, res) => {
    var category = req.body.category;
    console.log('getBooksByCategory');
    console.log(`post: category = ${req.body.category}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Book.find( { categories: { $in: [category] } },
                (err, book) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(book);
                    res.status(200).json(book);
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

exports.getBooksByBorrowerPhone = (req,res) => {
    var phone = req.body.phone;
    console.log('getBooksByBorrowerPhone');
    console.log(`post: phone = ${req.body.phone}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Book.find( { 'borrower.phone': { $eq:phone } },
                (err, book) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(book);
                    res.status(200).json(book);
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

exports.getBooksByCategoryAndPhone = (req,res) => {
    var category = req.params.category,
        phone = req.params.phone;
    console.log('getBooksByCategoryAndPhone');
    console.log(`category = ${req.params.category}, phone = ${req.params.phone}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Book.find( { $and: [ { categories: { $in: [category] } }, { 'borrower.phone': { $eq:phone } } ] },
                (err, book) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(book);
                    res.status(200).json(book);
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
