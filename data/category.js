'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    consts = require('./consts'),
    Category = require('./schemas/category'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

exports.getAllCategories = (req, res) => {
    console.log('getAllCategories');
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Category.find( {},
                (err, category) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(category);
                    res.status(200).json(category);
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
exports.createCategory = (req, res) => {
    var name = req.body.name;
    console.log('createCategory');
    console.log(`post: name = ${req.body.name}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newCategory = new Category({
                name: name
            });
            newCategory.save(
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
                        console.log(`Saved document: ${newCategory}`);
                        res.status(200).json(newCategory);
                        //mongoose.disconnect();
                    }
                });
        },
        err =>{
            console.log(`connection error: ${err}`);
        }

    );    
};


exports.updateCategory = (req, res) => {};

