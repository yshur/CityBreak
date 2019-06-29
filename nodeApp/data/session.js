'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    Session = require('./schemas/session'),
    SessionDetails = require('./session_details');;

exports.saveSession = (session_id, user_id, callback) => {
    var newSession = new Session({
        session_id: session_id,
        user_id: 	user_id
    });
    console.log(`saveSession: ${session_id}`);
    newSession.save(
        (err, session) => {
            if(err) {
                console.log(`err: ${err}`);
                callback(err);
            }
            console.log(`Saved session:`);
            callback(null, session);
        });
};
exports.getSessions = (req, res) => {
  console.log('getSessions');
  var show = {
    "session_id":1, "user_id":1,"setup_time":1,
    "end_time":1,"status":1
    };
  var sort = {
      sort:{ setup_time: -1 }
  };
	var q = Session.find({}, show, sort);
	q.exec(function(err, sessions)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
		}
		console.log(sessions);
		res.status(200).json(sessions);
	});
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
exports.destroySession = (session_id, callback) => {
  console.log(`destroySession: session_id = ${session_id}`);

  var id = {"session_id": session_id, "status": 0 };
  var params = {
    end_time: Date.now(),
    status: 1
  };
  var opts = { new: true };
  Session.findOneAndUpdate(id, params, opts,
    (err, session) => {
        if(err) {
            console.log(`err: ${err}`);
            callback(err);
        }
        if(session == null) {
          console.log(`session not found`);
          callback("session not found");
        }
        console.log(`Saved session: ${session}`);
        callback(null, 1);
    });
};
exports.destroyAllSessions = (user_id, callback) => {
  var conditions = { "user_id": Number(user_id), "status": 0 };
	console.log(`destroyAllSessions: user_id = ${user_id}`);
  var update = { status: 1, end_time: Date.now() };
  var opts = {
      new: true,
      multi: true
  };
  Session.update(conditions, update, opts,
      (err, session) => {
          if(err) {
              console.log(`err: ${err}`);
              callback(err);
          } else {
              console.log(`destroy sessions: ${session}`)
              callback(null, session);
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
exports.destroyCookie = (req, res) => {
  cookies.set('testtoken', {expires: Date.now()});
};

exports.checkActiveSession = (req, callback) => {
  console.log(req.headers);
  if (!req.header('session_id') || !req.header('user_id')) {
    callback("unauthorized");
  } else {
  var session_id = req.header('session_id');
  var user_id = req.header('user_id');
  var conditions = { "session_id": session_id, "user_id":user_id, "status":0 };
	console.log(`checkActiveSession: session_id = ${session_id}`);

  Session.findOne(conditions,
      (err, session) => {
          if(err) {
              console.log(`err: ${err}`);
              callback(err);
          }
          if (!session){
            callback("session not found");
          }
          checkTimeSession(session.setup_time, (err, status) => {
            if(err) {
                console.log(`err: ${err}`);
                callback(err);
            }
            SessionDetails.saveDetails(req, (err, status) => {
              if(err) {
                  console.log(`err: ${err}`);
                  callback(err);
              } else {
                callback(null, status);
              }
            });
          });
      });
  }
};
function checkTimeSession(setup_time, callback) {
  var diffMs = Date.now() - setup_time; // milliseconds between now & setup_time
  var diffMins = Math.round(diffMs / 60000); // minutes
  if(diffMins > 60) {
    destroySession(session_id, (err, status) => {
      if(err) {
          console.log(`err: ${err}`);
          callback(err);
      }
      callback(null, status);
    });
  }
  callback(null, 0);
};
exports.getUserSessionId = (user_id, callback) => {
  console.log(`getUserSessionId: ${user_id}`);
  var show = {"session_id":1  };
	var q = Session.find({user_id:user_id}, show);
	q.exec(function(err, sessions)  {
			callback(err, sessions);
	});
}
