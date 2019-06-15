var mongoose = require('mongoose'),
    statesSchema = new mongoose.Schema({
        id: Number,
        state_name: String,
        situation: [String]
    });

module.exports = mongoose.model('States', statesSchema);
