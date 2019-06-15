var mongoose = require('mongoose'),
    user = require('./user'),
    stats_table = require('./stats_table'),
    sessionSchema = new mongoose.Schema({
        id: Number,
        user_id: {
          type: mongoose.Schema.ObjectId,
          ref: 'user',
          required: true
        },
        start_session: { type: Date, default: Date.now },
        end_session: { type: Date, default: Date.now },
        status: Boolean,
        state_name: {
          type: mongoose.Schema.ObjectId,
          ref: 'stats_table',
          required: true
        }
    });

module.exports = mongoose.model('Session', sessionSchema);
