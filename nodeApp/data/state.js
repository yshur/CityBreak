'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    State = require('./schemas/state');

exports.createState = (req, res) => {
    var newState = new State({
        id: 			req.body.id,
        name: 		req.body.name,
        methods: 	req.body.methods
    });
    console.log('createState:');
    console.log(newState);

    newState.save(
        (err) => {
            if(err) {
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Saved document:`);
                res.status(200).json(newState);
            }
        });
};
exports.getStates = (req, res) => {
  console.log('getStates');
  var show = {
		"id":1, "name":1,"methods":1
		};
	var q = State.find({}, show);
	q.exec(function(err, states)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err}`);
		}
		console.log(states);
		res.status(200).json(states);
	});
};
exports.getState = (req, res) => {
	console.log(`getState: stateid = ${req.params.stateid}`);
    var stateid = req.params.stateid;
    if (stateid.length < 5) {
      var id = {"id": Number(stateid) };
    } else {
      var id = { "_id": stateid };
    }
    State.findOne(id,
        (err, state) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err} }`);
            }
            console.log(state);
            res.status(200).json(state);
        }
    );
};
exports.updateState = (req, res) => {
	var stateid = req.params.stateid;
  if (stateid.length < 5) {
    var id = {"id": Number(stateid) };
  } else {
    var id = { "_id": stateid };
  }

	console.log(`updateState: stateid = ${req.params.stateid}`);
  var params = {};
	if (req.body.name) {
		params.name = req.body.name;
	}
	if (req.body.id) {
		params.id = req.body.id;
	}
	if (req.body.methods) {
		params.methods = req.body.methods;
	}
	console.log(params);
  var opts = {
      new: true
  };
  State.findOneAndUpdate(id, params, opts,
      (err, state) => {
          if(err) {
              console.log(`err: ${err}`);
              res.status(300).json(err);
          } else {
              console.log(`Updated state: ${state}`)
              res.status(200).json(state);
          }
      });
};
exports.deleteState = (req, res) => {
	console.log(`deleteState: stateid = ${req.params.stateid}`);
  var stateid = req.params.stateid;
  if (stateid.length < 5) {
    var id = {"id": Number(stateid) };
  } else {
    var id = { "_id": stateid };
  }
  State.findOneAndRemove(id, (err, state) => {
        // As always, handle any potential errors:
        if (err) return res.status(300).json(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (state == null){
          return res.status(200).json({"message": `State ${stateid} not found`});
        } else {
          return res.status(200).json({"message": `State ${stateid} successfully deleted`});
        }
    });
};
