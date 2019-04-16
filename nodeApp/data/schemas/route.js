var mongoose = require('mongoose'),
    routeSchema = new mongoose.Schema({
        id: String,
		name: String,
        count: Number,
		feasible: Boolean,
		route: Object
    });

module.exports = mongoose.model('Route', routeSchema);
