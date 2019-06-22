'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    Session = require('./schemas/session'),
    SessionDetails = require('./schemas/session_details');

exports.saveSessionDetails = (session_id, req) => {
    var newSessionDetails = new SessionDetails({
        session_id: session_id,
        host: req.headers.host,
        remote_addr: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user_agent: req.get('User-Agent'),
        path: req.originalUrl
    });
    console.log('saveSessionDetails:');
    console.log(newSessionDetails);

    newSessionDetails.save(
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
exports.getSessions = (req, res) => {
  console.log(req);
  // res.status(200).(req);
  // console.log('getSessions');
  // var show = {
  //   "session_id":1, "user_id":1,"setup_time":1,
  //   "setup_time":1, "end_time":1,"status":1,
  //   "state_list":1
  //   };
	// var q = Session.find({}, show);
	// q.exec(function(err, sessions)  {
	// 	if (err) {
	// 		console.log(`err: ${err}`);
	// 		res.status(200).json(`{ err : ${err}`);
	// 	}
	// 	console.log(sessions);
	// 	res.status(200).json(sessions);
	// });
};
exports.getSession = (req, res) => {
	console.log(`getSession: session_id = ${req.params.session_id}`);
    var session_id = req.params.session_id;
    var id = { $or: [{"_id": String(session_id)}, {"session_id": Number(session_id)}] };
    Session.findOne(session_id,
        (err, session) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err} }`);
            }
            console.log(session);
            res.status(200).json(session);
        }
    )
};
exports.updateSession = (req, res) => {
	var session_id = req.params.session_id;
  var id = { $or: [{"_id": String(session_id)}, {"session_id": Number(session_id)}] };
	console.log(`updateSession: session_id = ${req.params.session_id}`);
  var params = {};
	if (req.body.end_time) {
		params.end_time = req.body.end_time;
	}
	if (req.body.status != null) {
		params.status = req.body.status;
	}

	console.log(params);
  var opts = {
      new: true
  };
  Session.findOneAndUpdate(session_id, params, opts,
      (err, session) => {
          if(err) {
              console.log(`err: ${err}`);
              res.status(300).json(err);
          } else {
              console.log(`Updated session: ${session}`)
              res.status(200).json(session);
          }
      });
};
exports.deleteSession = (req, res) => {
	console.log(`deleteSession: session_id = ${req.params.session_id}`);
  var session_id = req.params.session_id;
  var id = { $or: [{"_id": String(session_id)}, {"session_id": Number(session_id)}] };
  Session.findOneAndRemove(session_id, (err, session) => {
        // As always, handle any potential errors:
        if (err) return res.status(300).json(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (session == null){
          return res.status(200).json({"message": `Session ${session_id} not found`});
        } else {
          return res.status(200).json({"message": `Session ${session_id} successfully deleted`});
        }
    });
};

exports.destroySession = (session_id) => {

  var session_id = { "session_id": Number(session_id) };
	console.log(`destroySession: session_id = ${session_id}`);
  var params = { status: 1 };
	console.log(params);
  var opts = {
      new: true
  };
  Session.findOneAndUpdate(session_id, params, opts,
      (err, session) => {
          if(err) {
              console.log(`err: ${err}`);
              return err;
          } else {
              console.log(`destroy session: ${session}`)
              return null;
          }
      });
};
exports.destroyAllSessions = (user_id) => {

  var conditions = { "user_id": Number(user_id), "status": 0 };
	console.log(`destroyAllSessions: user_id = ${user_id}`);
  var update = { status: 1 };
	console.log(params);
  var opts = {
      new: true,
      multi: true
  };
  Session.update(conditions, update, opts,
      (err, session) => {
          if(err) {
              console.log(`err: ${err}`);
              return err;
          } else {
              console.log(`destroy sessions: ${session}`)
              return null;
          }
      });
};
