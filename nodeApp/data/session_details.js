'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    Session = require('./schemas/session'),
    SessionDetails = require('./schemas/session_details');

exports.saveDetails = (req, callback) => {
    var newDetails = new SessionDetails({
        session_id: req.session.session_id,
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
                return err;
            } else {
                console.log(`Saved document:`);
                return null;
            }
        });
};
exports.getAllDetails = (req, res) => {
  console.log("getAllDetails");
	var q = SessionDetails.find({});
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
	var q = SessionDetails.find({session_id:session_id});
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
