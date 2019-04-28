var mongoose = require('mongoose'),
    Route = require('./schemas/route');

exports.getAllRoutes = (req, res) => {
    console.log('getAllRoutes');
	var q = Route.find({}).limit(10);

	q.exec(function(err, routes)  {
		if (err) {
			console.log(`err: ${err}`);
			res.status(200).json(`{ err : ${err} }`);
		}
		console.log(routes);
		res.status(200).json(routes);
	});
};
