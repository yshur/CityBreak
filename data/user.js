'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    User = require('./schemas/user'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

exports.getAllUsers = (req, res) => {
    console.log('getAllUsers');
    // return data;
    User.find( {},
        (err, user) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(user);
            res.status(200).json(user);
        }
    )
};

exports.createUser = (req, res) => {
<<<<<<< HEAD
    var name = req.body.name,
=======
    var full_name = req.body.full_name,
>>>>>>> 56a6717b7bb2c2a5058c1ed1654a4f714076eb06
        phone = req.body.phone,
        email = req.body.email,
        password = req.body.password,
        image = req.body.image;
        console.log('createUser');
<<<<<<< HEAD
        console.log(`post: name = ${req.body.name},
=======
        console.log(`post: full_name = ${req.body.full_name},
>>>>>>> 56a6717b7bb2c2a5058c1ed1654a4f714076eb06
        phone = ${req.body.phone},
        email = ${req.body.email},
        password = ${req.body.password},
        image = ${req.body.image}`);

    var newUser = new User({
<<<<<<< HEAD
        name: name,
=======
        full_name: full_name,
>>>>>>> 56a6717b7bb2c2a5058c1ed1654a4f714076eb06
        phone: phone,
        email: email,
        password: password,
        image: image
    });
    newUser.save(
        (err) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Saved document: ${newUser}`);
                res.status(200).json(newUser);
            }
        });
};

exports.getUser = (req, res) => {
    var userid = req.params.userid;
    console.log('getUser');
    console.log(`get: userid = ${req.params.userid}`);

    User.findById(userid,
        (err, user) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(user);
            res.status(200).json(user);
        }
    )
};

exports.updateUser = (req, res) => {
    var userid = req.body.userid;
    var phone = req.body.phone,
        email = req.body.email;

    var conditions = {phone: phone, email:email}
    opts = {
        runValidators: true,
        multi: true,
        new: true
    };
    User.findByIdAndUpdate(userid, conditions, opts,
        (err, user) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Updated user: ${user}`)
                res.status(200).json(user);
            }
        });
};

exports.deleteUser = (req, res) => {
    var userid = req.body.userid;
    var conditions = {_id: userid};

    User.remove(conditions,
        (err) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Removed document`);
                User.findOne({_id: userid},
                    (err) => {
                        console.log(`Removed user id=${userid} `);
                        res.status(200).json({result:`Removed ${userid}`});
                    });
            };
        });
};
