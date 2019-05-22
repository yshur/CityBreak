var mongoose = require('mongoose'),
    pointSchema = new mongoose.Schema({
        name: {
            type: String,
            uniqe: true
        },
        about: String,
        description: String,
        image : [ObjectId],
        setup_time: {
          type: Date,
          default: Date.now
        },
        tags: [String],
        duration: Number,
        visited_num: {
          type: Number,
          default: 0
        },
        score: {
          type: Number,
          default: 0
        },
        address: String,
        longitude: Number,
        latitude: Number,
        price: Number,
        open_always: Boolean,
        open_hours: String,
        days_open: String,
        area: String,
        sub_area: String,
        accessibility: [String],
        recommended_season: [String],
        feedbacks: [ObjectId],
        tours_used: [ObjectId]
    });

module.exports = mongoose.model('Point', pointSchema);