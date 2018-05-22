'use strice';//JS engine use strict parsing
// var data = require('./data.json');
var mongoose = require('mongoose'),
    consts = require('./consts'),
    Book = require('./book'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

exports.getAllBooks = (req, res) => {
    console.log('getAllBooks');
    // return data;
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Book.find( {},
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
    // var foundItems = [];
    // for(let i in data) {
    //     if(data[i].categories.includes(category) == true) {
    //         // console.log(data[i].name);
    //         foundItems.push(data[i]);
    //     }
    // }

    // if(foundItems.length == 0) {
    //     foundItems.push({"err":"book not found"});
    // } 
    // console.log(`${foundItems}`);    
    // return foundItems;
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
    // var foundItems = [];
    // for(let i in data) {
    //     if(data[i].borrower.phone == phone) {
    //         // console.log(data[i].name);
    //         foundItems.push(data[i]);
    //     }
    // }

    // if(foundItems.length == 0) {
    //     foundItems.push({"err":"book not found"});
    // } 
    // console.log(`${foundItems}`);    
    // return foundItems;
};

exports.getBooksByCategoryAndPhone = (req,res,next) => {
    var category = req.params.category,
        phone = req.params.phone;
    console.log('getBooksByCategoryAndPhone');
    console.log(`category = ${req.params.category}, phone = ${req.params.phone}`);
    getCategoryPhone(res, category, phone);
    next();
};

exports.postBooksByCategoryAndPhone = (req,res,next) => {
    var category = req.body.category,
        phone = req.body.phone;
    console.log('getBooksByCategoryAndPhone');
    console.log(`post: category = ${req.body.category}, phone = ${req.body.phone}`);
    getCategoryPhone(res, category, phone); 
    next();   
};

getCategoryPhone = (res, category, phone) => {
  //  console.log('getCategoryPhone');
  //  console.log(`category = ${category}, phone = ${phone}`);

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

    // var foundItems = [];
    // for(let i in data) {
    //     if((data[i].borrower.phone == phone) && (data[i].categories.includes(category) == true)) {
    //         // console.log(data[i].name);
    //         foundItems.push(data[i]);
    //     }
    // }

    // if(foundItems.length == 0) {
    //     foundItems.push({"err":"book not found"});
    // } 
    // console.log(`${foundItems}`);    
    // return foundItems;
};
