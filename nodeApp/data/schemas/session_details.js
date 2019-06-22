var mongoose = require('mongoose'),
    user = require('./user'),
    session = require('./session'),
    session_detailSchema = new mongoose.Schema({
        session_id: { type: String, index: 1, required: true },
        host: String,
        remote_addr: String,
        user_agent: String,
        setup_time: { type: Date, default: Date.now },
        path: String
    });

module.exports = mongoose.model('session_details', session_detailSchema);
