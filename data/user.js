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
    var full_name = req.body.full_name,
        phone = req.body.phone,
        email = req.body.email,
        password = req.body.password,
        image = req.body.image;
    console.log('createUser');
    console.log(`post: full_name = ${req.body.full_name},
        phone = ${req.body.phone},
        email = ${req.body.email},
        password = ${req.body.password},
        image = ${req.body.image}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newUser = new User({
                full_name: full_name,
                phone: phone,
                email: email,
                password: password,
                image: image
            });
            newUser.save(
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
                        console.log(`Saved document: ${newUser}`);
                        res.status(200).json(newUser);
                        //mongoose.disconnect();
                    }
                });
        },
        err =>{
            console.log(`connection error: ${err}`);
        }
    );
};

exports.getUser = (req, res) => {
    var userid = req.params.userid;
    console.log('getUser');
    console.log(`get: userid = ${req.params.userid}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            User.findById(userid,
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
exports.updateUser = (req, res) => {}
exports.deleteUserByName = (req, res) => {
    var name = req.body.name;
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var conditions = {name: name};

            User.remove(conditions,
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
                        console.log(`Removed document`);
                        User.findOne({name: name},
                            (err) => {
                                console.log(`Removed user ${name} `);
                            });
                    };
                });
        });
};
