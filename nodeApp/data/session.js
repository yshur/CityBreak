'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    Session = require('./schemas/session');

exports.createSession = (req, res) => {
    var newSession = new Session({
        id: 			req.body.id,
        user_id: 	req.body.user_id
    });
    console.log('createSession:');
    console.log(newSession);

    newSession.save(
        (err) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Saved document:`);
                res.status(200).json(newSession);
            }
        });
};
exports.getSessions = (req, res) => {
  console.log('getSessions');
  var show = {
    "id":1, "user_id":1,"setup_time":1,
    "setup_time":1, "end_time":1,"status":1,
    "state_list":1
    };
	var q = Session.find({}, show);
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
	console.log(`getSession: sessionid = ${req.params.sessionid}`);
    var sessionid = req.params.sessionid;
    var id = { $or: [{"_id": String(sessionid)}, {"id": Number(sessionid)}] };
    Session.findOne(id,
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
	var sessionid = req.params.sessionid;
  var id = { $or: [{"_id": String(sessionid)}, {"id": Number(sessionid)}] };
	console.log(`updateSession: sessionid = ${req.params.sessionid}`);
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
  Session.findOneAndUpdate(id, params, opts,
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
	console.log(`deleteSession: sessionid = ${req.params.sessionid}`);
  var sessionid = req.params.sessionid;
  var id = { $or: [{"_id": String(sessionid)}, {"id": Number(sessionid)}] };
  Session.findOneAndRemove(id, (err, session) => {
        // As always, handle any potential errors:
        if (err) return res.status(300).json(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (session == null){
          return res.status(200).json({"message": `Session ${sessionid} not found`});
        } else {
          return res.status(200).json({"message": `Session ${sessionid} successfully deleted`});
        }
    });
};
