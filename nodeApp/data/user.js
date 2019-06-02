'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    User = require('./schemas/user'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };


exports.createUser = (req, res) => {
    var newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        image_url: req.body.image_url,
        family_status: req.body.family_status,
        birthdate: req.body.birthdate,
        living_area: req.body.living_area,
        living_city: req.body.living_city,
        health_condition: req.body.health_condition,
        accessibility: req.body.accessibility,
        profession: req.body.profession,
        about: req.body.about,
        tags: req.body.tags
    });
    console.log('createUser:');
    console.log(newUser);

    newUser.save(
        (err) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Saved document:`);
                res.status(200).json(newUser);
            }
        });
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

exports.getUser = (req, res) => {
    var userid = req.params.userid;
    console.log(`getUser: userid = ${req.params.userid}`);
    User.findById(userid,
        (err, user) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err} }`);
            }
            console.log(user);
            res.status(200).json(user);
        }
    )
};
exports.getAllUsers = (req, res) => {
    console.log('getAllUsers');
    // return data;
    User.find( {},
        (err, user) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err} }`);
            }
            console.log(user);
            res.status(200).json(user);
        }
    )
};
exports.deleteUser = (req, res) => {
    var userid = req.params.userid;
    console.log('deleteUser: userid = '+userid);
    User.findByIdAndRemove(userid, (err, user) => {
          // As always, handle any potential errors:
          if (err) return res.status(300).json(err);
          // We'll create a simple object to send back with a message and the id of the document that was removed
          // You can really do this however you want, though.
          if (user == null){
            return res.status(200).json({"message": `User ${userid} not found`});
          } else {
            return res.status(200).json({"message": `User ${userid} successfully deleted`});
          }
      });
};
exports.deleteAllUsers = (req, res) => {
    console.log('deleteAllUsers');
    User.remove({}, (err, user) => {
          // As always, handle any potential errors:
          if (err) return res.status(300).json(err);
          // We'll create a simple object to send back with a message and the id of the document that was removed
          // You can really do this however you want, though.
          return res.status(200).json({"message": `All users successfully deleted`});
      });
};
exports.login = (req, res) => {
  var username = req.body.username,
      password = req.body.password;
  console.log(`login: username = ${req.body.username}, password = {req.body.password}`);
  var q = User.findOne({
      $and: [
          {"password":password},
          { $or: [{"username": username}, {"email": username}] }
        ]
      },
      {"_id":1, "first_name":1, "last_name":1}
    );
    q.exec(function(err, user) {
        if (err) {
            console.log(`err: ${err}`);
            res.status(200).json({ "err" : err });
        }
        console.log(user);
        res.status(200).json(user);
      }
  );
};
