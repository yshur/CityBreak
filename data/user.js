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
    var full_name = req.body.full_name;
        phone = req.body.phone,
        email = req.body.email,
        password = req.body.password,
        image = req.body.image;

    var conditions = {phone: phone, email:email, password:password, image:image}
    opts = {multi: true};
    User.findByIdAndUpdate(userid, conditions, opts,
        (err, user) => {
            if(err)
                console.log(`err: ${err}`);
            else {
                console.log(`Updated user: ${user}`)
                res.status(200).json(user);
            }
        })
};

exports.deleteUserByName = (req, res) => {
    var full_name = req.body.full_name;
    var conditions = {full_name: full_name};

    User.remove(conditions,
        (err) => {
            if(err)
                console.log(`err: ${err}`);
            else {
                console.log(`Removed document`);
                User.findOne({full_name: full_name},
                    (err) => {
                        console.log(`Removed user ${full_name} `);
                        res.status(200).json(`Removed user ${full_name}`);
                    });
            };
        });
};
