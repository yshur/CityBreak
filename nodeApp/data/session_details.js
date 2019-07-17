'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    Session = require('./schemas/session'),
    SessionDetails = require('./schemas/session_details');

exports.saveDetails = (req, callback) => {
    var newDetails = new SessionDetails({
        session_id: req.header('session_id'),
        host: req.headers.host,
        remote_addr: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user_agent: req.get('User-Agent'),
        path: req.originalUrl
    });
    console.log('saveSessionDetails:');
    console.log(newDetails);

    newDetails.save(
        (err) => {
            if(err) {
                console.log(`err: ${err}`);
                callback(err);
            } else {
                console.log(`Saved document:`);
                callback(null, 1);
            }
        });
};
exports.getAllDetails = (req, res) => {
  console.log("getAllDetails");
  var sort = {
      sort:{ setup_time: -1 }
  };
	var q = SessionDetails.find({}, {}, sort);
	q.exec(function(err, sessions)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
		}
		res.status(200).json(sessions);
	});
};
exports.getSessionDetails = (req, res) => {
  var session_id = req.params.session_id;
  console.log(`getSessionDetails: ${req.params.session_id}`);
  var sort = {
      sort:{ setup_time: -1 }
  };
	var q = SessionDetails.find({session_id:session_id}, sort);
	q.exec(function(err, sessions)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
		}
		res.status(200).json(sessions);
	});
};
exports.getUserDetails = (req, res) => {
  var user_id = req.params.user_id;
  console.log(`getUserDetails: ${req.params.session_id}`);
  Session.getUserSessionId(user_id, (err, session_ids) => {
    if(err) {
        console.log(`err: ${err}`);
        callback(err);
    }
    var q = SessionDetails.find({session_id: {$in: {session_ids}}});
    q.exec(function(err, sessions)  {
      if (err) {
        console.log(`err: ${err}`);
        res.status(200).json(`{ err : ${err}`);
      }
      res.status(200).json(sessions);
    });
  });
};
exports.getLastDetailsSession = (sessions, callback) => {
  console.log(`getLastDetailsSession:`);
  var sort = {
      limit:1,
      sort:{ setup_time: -1 }
  };
  var q = SessionDetails.findOne({session_id:{ $in: sessions}}, {}, sort);
  q.exec(function(err, details)  {
    callback(err, details);
  });
};
exports.getLastUserDetails = (req, res) => {
  var user_id = req.params.user_id;
  console.log(`getLastUserDetails: ${req.params.session_id}`);
  Session.getUserSessionId(user_id, (err, session_ids) => {
    if(err) {
        console.log(`err: ${err}`);
        callback(err);
    }
    var q = SessionDetails.find({session_id: {$in: {session_ids}}});
    q.exec(function(err, sessions)  {
      if (err) {
        console.log(`err: ${err}`);
        res.status(200).json(`{ err : ${err}`);
      }
      getLastSessionsDetails(session_ids, (details) => {
        callback(details);
      });
    });
  });
};
exports.getLastSessionsDetails = (session_ids, callback) => {
    var details = session_ids.map(function(v) {
      return getLastSessionDetails(v);
    });
    callback(details);
};
