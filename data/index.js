'use strice';//JS engine use strict parsing
// var data = require('./data.json');
var mongoose = require('mongoose'),
    consts = require('./consts'),
    User = require('./schemas/user'),
    Chat = require('./schemas/chat'),
    Event = require('./schemas/event'),
    Category = require('./schemas/category'),
    Equipment = require('./schemas/equipment'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };



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
