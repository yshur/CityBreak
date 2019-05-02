var mongoose = require('mongoose'),
    pointSchema = new mongoose.Schema({
		category: [String],
		description: String,
		imageUrl: String,
		referenceUrl: String,
		rating: Number,
		raters: Number,
		name: String,
		id: String,
		source: String,
		location: Object
	});
module.exports = mongoose.model('Point', pointSchema);
