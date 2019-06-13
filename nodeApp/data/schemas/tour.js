var mongoose = require('mongoose'),
    user = require('./user'),
    point = require('./point'),
    tourSchema = new mongoose.Schema({
        name: { type: String, index: 1, uniqe: true },
        about: String,
        description: String,
        setup_time: { type: Date, default: Date.now },
        update_time: { type: Date, default: Date.now },
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            // required: true
        },
        tags: [String],
        duration: Number,
        distance: Number,
        start_point: {
            type: mongoose.Schema.ObjectId,
            ref: 'point',
            // required: true
        },
        price: Number,
        open_always: Boolean,
        open_hours: String,
        days_open: String,
        area: String,
        sub_area: String,
        accessibility: [String],
        recommended_season: [String],
        // visitors: [{
        //   user: {
        //       type: mongoose.Schema.ObjectId,
        //       ref: 'user',
        //       required: true
        //   },
        //   setup_time: { type: Date, default: Date.now }
        // }],
        // scores: [{
        //   content: Number,
        //   user: {
        //       type: mongoose.Schema.ObjectId,
        //       ref: 'user',
        //       required: true
        //   },
        //   setup_time: { type: Date, default: Date.now }
        // }],
        // feedbacks: [{
        //   content: String,
        //   user: {
        //       type: mongoose.Schema.ObjectId,
        //       ref: 'user',
        //       required: true
        //   },
        //   setup_time: { type: Date, default: Date.now }
        // }],
        points_list: [{
            type: mongoose.Schema.ObjectId,
            ref: 'point'
        }],
        difficulty: Number,
        is_public: Boolean,
        is_done: Boolean
    });

module.exports = mongoose.model('Tour', tourSchema);
