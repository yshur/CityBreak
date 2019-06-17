var mongoose = require('mongoose'),
    user = require('./user'),
    stateSchema = new mongoose.Schema({
        id: Number,
        name: String,
        status: String
    });

module.exports = mongoose.model('States', stateSchema);
