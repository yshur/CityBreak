var mongoose = require('mongoose'),
    user = require('./user'),
    state = require('./state'),
    sessionSchema = new mongoose.Schema({
        session_id: { type: String, index: 1, required: true },
        user_id: {
          type: mongoose.Schema.ObjectId,
          ref: 'user',
          required: true
        },
        setup_time: { type: Date, default: Date.now },
        end_time: { type: Date, default: null},
        status: { type: Number, default: 0 }
    });

module.exports = mongoose.model('Session', sessionSchema);
