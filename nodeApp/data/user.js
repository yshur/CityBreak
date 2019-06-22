'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    session = require('express-session'),
    Session = require('./session'),
    SessionDetails = require('./session_details'),
    User = require('./schemas/user'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
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
        var unix = Math.floor(new Date() / 1000);
        var session_id = user._id+'_'+String(unix);
        console.log(user);
        req.session.user = user;
        req.session.state = 1;
        req.session.session_id = session_id;
        Session.saveSession(session_id, user._id);
        res.status(200).json(user);
      }
  );
};
exports.logout = (req, res) => {
  req.session.destroy();
  if (req.session && req.session.session_id) {
    Session.destroySession(req.session.session_id);
  }
  res.status(200).json({"result":"logged out seccesfully"});
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
exports.getUsers = (req, res) => {
    console.log('getUsers');
    // if (!req.session.user) {
    //   return res.status(401).send();
    // }
	var show = {
		"_id":1, "first_name":1,"last_name":1,"email":1,"image_url":1,
		"living_city":1,"about":1,"tags":1
		};
	var q = User.find({}, show);
	q.exec(function(err, users)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
		}
		console.log(users);
		res.status(200).json(users);
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
exports.updateUser = (req, res) => {
	var userid = req.params.userid;
    console.log(`updateUser: userid = ${req.params.userid}`);
    var params = {};
	if (req.body.first_name) {
		params.first_name = req.body.first_name;
	}
	if (req.body.last_name) {
		params.last_name = req.body.last_name;
	}
	if (req.body.phone) {
		params.phone = req.body.phone;
	}
	if (req.body.email) {
		params.email = req.body.email;
	}
	if (req.body.username) {
		params.username = req.body.username;
	}
	if (req.body.password) {
		params.password = req.body.password;
	}
	if (req.body.image_url) {
		params.image_url = req.body.image_url;
	}
	if (req.body.family_status) {
		params.family_status = req.body.family_status;
	}
	if (req.body.living_area) {
		params.living_area = req.body.living_area;
	}
	if (req.body.living_city) {
		params.living_city = req.body.living_city;
	}
	if (req.body.health_condition) {
		params.health_condition = req.body.health_condition;
	}
	if (req.body.accessibility) {
		params.accessibility = req.body.accessibility;
	}
	if (req.body.profession) {
		params.profession = req.body.profession;
	}
	if (req.body.tags) {
		params.tags = req.body.tags;
	}

    var opts = {
        new: true
    };
    User.findByIdAndUpdate(userid, params, opts,
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
