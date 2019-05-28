var mongoose = require('mongoose'),
    user = require('./user'),
    calendarSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            index: 1,
            required: true
        },
        setup_time: { type: Date, default: Date.now },
        plan_time: { type: Date, required: true },
        tour: { type: ObjectId, required: true },
        type: String
    });

module.exports = mongoose.model('Calendar', calendarSchema);
