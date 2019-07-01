var mongoose = require('mongoose'),
    user = require('./user'),
    pointSchema = new mongoose.Schema({
        name: { type: String, required: true, index: 1 },
        about: String,
        description: [String],
        image_url: [String],
		    reference_url: String,
        setup_time: { type: Date, default: Date.now },
        tags: [String],
        duration: { type: Number, default: 30 },
        address: String,
        longitude: Number,
        latitude: Number,
        area: String,
        sub_area: String,
        visitors: [{
          user: {
              type: mongoose.Schema.ObjectId,
              ref: 'user'
          },
          setup_time: { type: Date, default: Date.now }
        }],
        score: {type:Number, default:0},
        scores: [{
          content: Number,
          user: {
              type: mongoose.Schema.ObjectId,
              ref: 'user'
          },
          setup_time: { type: Date, default: Date.now }
        }],
        feedbacks: [{
          content: String,
          user: {
              type: mongoose.Schema.ObjectId,
              ref: 'user'
          },
          setup_time: { type: Date, default: Date.now }
        }],
    		loc: {
    			type: { type: String },
    			coordinates: []
    		}
    });

pointSchema.index({ loc: "2dsphere" });
module.exports = mongoose.model('Point', pointSchema);
