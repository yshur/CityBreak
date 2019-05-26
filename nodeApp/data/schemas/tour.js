var mongoose = require('mongoose'),
    user = require('./user'),
    point = require('./point'),
    tourSchema = new mongoose.Schema({
        name: { type: String, required: true, index: 1, uniqe: true },
        about: String,
        description: String,
        setup_time: { type: Date, default: Date.now },
        update_time: { type: Date, default: Date.now },
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: true
        },
        tags: [String],
        duration: Number,
        distance: Number,
        visited_num: { type: Number, default: 0 },
        scored_num: { type: Number, default: 0 },
        score: { type: Number, default: 0 },
        start_point: {
            type: mongoose.Schema.ObjectId,
            ref: 'point',
            required: true
        },
        price: Number,
        open_always: Boolean,
        open_hours: String,
        days_open: String,
        area: String,
        sub_area: String,
        accessibility: [String],
        recommended_season: [String],
        feedbacks: [ObjectId],
        points_list: [{
            type: mongoose.Schema.ObjectId,
            ref: 'point'
        }],
        difficulty: Number,
        is_public: Boolean,
        is_done: Boolean
    });

module.exports = mongoose.model('Tour', tourSchema);
