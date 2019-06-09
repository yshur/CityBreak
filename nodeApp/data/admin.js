'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    Admin = require('./schemas/user'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

exports.getAllAdmins = (req, res) => {
    console.log('getAlladmins');
    // return data;
    Admin.find( {},
        (err, admin) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(admin);
            res.status(200).json(admin);
        }
    )
};

exports.createAdmin = (req, res) => {
    var name = req.body.name,
        phone = req.body.phone,
        email = req.body.email,
        password = req.body.password,
        image = req.body.image;
        console.log('createadmin');
        console.log(`post: name = ${req.body.name},
        phone = ${req.body.phone},
        email = ${req.body.email},
        password = ${req.body.password},
        image = ${req.body.image}`);

    var newAdmin = new Admin({
        name: name,
        phone: phone,
        email: email,
        password: password,
        image: image
    });
    newAdmin.save(
        (err) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Saved document: ${newAdmin}`);
                res.status(200).json(newAdmin);
            }
        });
};

exports.getAdmin = (req, res) => {
    var adminid = req.params.adminid;
    console.log('getadmin');
    console.log(`get: adminid = ${req.params.adminid}`);

    Admin.findById(adminid,
        (err, admin) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(admin);
            res.status(200).json(admin);
        }
    )
};

exports.updateAdmin = (req, res) => {
    var adminid = req.body.adminid;
    var phone = req.body.phone,
        email = req.body.email;

    var conditions = {phone: phone, email:email}
    opts = {
        runValidators: true,
        multi: true,
        new: true
    };
    Admin.findByIdAndUpdate(adminid, conditions, opts,
        (err, admin) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Updated admin: ${admin}`)
                res.status(200).json(admin);
            }
        });
};

exports.deleteAdmin = (req, res) => {
    var adminid = req.body.adminid;
    var conditions = {_id: adminid};

    Admin.remove(conditions,
        (err) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Removed document`);
                Admin.findOne({_id: adminid},
                    (err) => {
                        console.log(`Removed admin id=${adminid} `);
                        res.status(200).json({result:`Removed ${adminid}`});
                    });
            };
        });
};
