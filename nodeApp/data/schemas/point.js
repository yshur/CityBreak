var mongoose = require('mongoose'),
    user = require('./user'),
    pointSchema = new mongoose.Schema({
        name: { type: String, required: true, index: 1, uniqe: true },
        about: String,
        description: String,
        image_url: String,
		    reference_url: String,
        setup_time: { type: Date, default: Date.now },
        tags: [String],
        duration: Number,
        address: String,
        longitude: Number,
        latitude: Number,
        area: String,
        sub_area: String,
        accessibility: Boolean,
        recommended_season: [String],
        visitors: [{
          user: {
              type: mongoose.Schema.ObjectId,
              ref: 'user',
              required: true
          },
          setup_time: { type: Date, default: Date.now }
        }],
        scores: [{
          content: Number,
          user: {
              type: mongoose.Schema.ObjectId,
              ref: 'user',
              required: true
          },
          setup_time: { type: Date, default: Date.now }
        }],
        feedbacks: [{
          content: String,
          user: {
              type: mongoose.Schema.ObjectId,
              ref: 'user',
              required: true
          },
          setup_time: { type: Date, default: Date.now }
        }],
        tours_used: [mongoose.Schema.ObjectId],
		loc: {
			type: { type: String }, 
			coordinates: []
		}
    });
	
pointSchema.index({ loc: "2dsphere" });
module.exports = mongoose.model('Point', pointSchema);
