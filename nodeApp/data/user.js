'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    session = require('express-session'),
    Session = require('./session'),
    User = require('./schemas/user');

exports.login = (req, res) => {
  var username = req.body.username,
      password = req.body.password;
  console.log(`login: username = ${req.body.username}, password = ${req.body.password}`);

  var q = User.findOne({
      $and: [
          {"password":password},
          { $or: [{"username": username}, {"email": username}] }
        ]
      },
      {"_id":1, "first_name":1, "last_name":1, "username":1, "email":1 }
    );
    q.exec(function(err, user) {
        if (err) {
            console.log(`err: ${err}`);
            res.status(300).json({ "err" : err });
        } else if(user == null) {
          res.status(300).json({ "err" : "user not found" });
        } else {

          var unix = Math.floor(new Date() / 1000);
          var session_id = user._id+'_'+String(unix);
          console.log(user);
          req.session.user = user;
          req.session.session_id = session_id;
          Session.saveSession(session_id, user._id, (err, session) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json({ "err" : err });
            }
            res.status(200).json({"user":user,"session":session});
          });
        }
      }
  );
};
exports.logout = (req, res) => {
  console.log("logout");
  if (req.header('session_id')) {
    Session.destroySession(req.header('session_id'), (err, result) => {
      if(err) {
        req.session.destroy();
        res.status(200).json(err);
      } else {
        req.session.destroy();
        res.status(200).json({"result":"logged out seccesfully"});
      }
    });
  } else {
res.status(200).json({"result":"You havn't logged in"});
  }
};

exports.createUser = (req, res) => {
  console.log("createUser");
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
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
        console.log(`err: ${err}`);
        res.status(300).json(err);
    } else{
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
    }});
};
exports.getUser = (req, res) => {
  console.log('getUser');
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
      console.log(`err: ${err}`);
      res.status(300).json(err);
    } else{
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
          });
    }});
};
exports.updateUser = (req, res) => {
  console.log('updateUser');
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
      console.log(`err: ${err}`);
      res.status(300).json(err);
    } else {
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

      if(req.header('user_id') === userid) {
        updateUser(userid, params, (err, user) => {
          if (err) return res.status(300).json(err);
          return res.status(200).json(user);
        });
      } else {
        isAdmin(req.header('user_id'), (err, user) => {
          if (err) return res.status(300).json(err);
          if (user == null) {
            return res.status(300).json("You have no permissions");
          } else {
            updateUser(userid, params, (err, user) => {
              if (err) return res.status(300).json(err);
              return res.status(200).json(user);
            });
          }
        });
      }
    }});
};
exports.deleteUser = (req, res) => {
  console.log('deleteUser');
  Session.checkActiveSession(req, (err, result) => {
    if(err) {
      console.log(`err: ${err}`);
      res.status(300).json(err);
    } else {
      var userid = req.params.userid;
      console.log('deleteUser: userid = '+userid);
      if(req.header('user_id') === userid) {
        removeUser(userid, (err, user) => {
          if (err) return res.status(300).json(err);
          return res.status(200).json(user);
        });
      } else {
        isAdmin(req.header('user_id'), (err, user) => {
          if (err) return res.status(300).json(err);
          if (user == null) {
            return res.status(300).json("You have no permissions");
          } else {
            removeUser(userid, (err, user) => {
              if (err) return res.status(300).json(err);
              return res.status(200).json(user);
            });
          }
        });
      }
    }
  });
};
function updateUser(userid, params, callback) {
  var opts = { new: true };
  User.findByIdAndUpdate(userid, params, opts,
      (err, user) => {
          if(err) callback(err);
          if (user == null){
            callback({"message": `User ${userid} not found`});
          } else {
            callback(null, user);
          }
      });
}
function removeUser(userid, callback){
  User.findByIdAndRemove(userid, (err, user) => {
        // As always, handle any potential errors:
        if (err) callback(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (user == null){
          callback({"message": `User ${userid} not found`});
        } else {
          callback(null, {"message": `User ${userid} successfully deleted`});
        }
    });
}
exports.isAdmin = (user_id, callback) => {
  var show = {
    "is_admin":1
    };
  var conditions = {_id:user_id, is_admin:true};
  User.findById(conditions, show,
    (err, user) => {
        callback(err, user);
    });
};
