var mongoose = require('mongoose'),
    user = require('./user'),
    point = require('./point'),
    tourSchema = new mongoose.Schema({
        name: { type: String, index: 1, required: true },
        about: String,
        setup_time: { type: Date, default: Date.now },
        update_time: { type: Date, default: null },
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: true
        },
        tags: [String],
        duration: { type: Number, default: 0 },
        distance: { type: Number, default: 0 },
        points_list: [{
            order: Number,
            distance: Number,
            duration: Number,
            point: {
                type: mongoose.Schema.ObjectId,
                ref: 'point'
            }
        }],
        image_url: String,
        map_url: String,
        area: String,
        sub_area: String,
        accessibility: Boolean,
        recommended_season: [String],
        is_public: Boolean,
        is_done: Boolean,
        visitors: [{
          user: {
              type: mongoose.Schema.ObjectId,
              ref: 'user'
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
              ref: 'user'          },
          setup_time: { type: Date, default: Date.now }
        }]
    });

module.exports = mongoose.model('Tour', tourSchema);
