'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    consts = require('./consts'),
    User = require('./schemas/user'),
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

exports.createUser = (req, res) => {
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newUser = new User({
                full_name: "Yair Shur",
                phone: "0522909908",
                email: "yairShur@gmail.com",
                password: "yyyyy",
                image: "url"
            });
            newUser.save(
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
                        console.log(`Saved document: ${JSON.stringfiy(newUser)}`);
                        mongoose.disconnect();
                    }
                });
        },
        err =>{
            console.log(`connection error: ${err}`);
        }
    );
};
exports.getUser = (req, res) => {};
exports.updateUser = (req, res) => {};
