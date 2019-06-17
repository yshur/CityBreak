var mongoose = require('mongoose'),
    stateSchema = new mongoose.Schema({
        id: { type: Number, index: 1,
           // unique: true,
           required: true },
        name: { type: String, index: 1,
          // unique: true,
          required: true },
        methods: [String]
    });

module.exports = mongoose.model('States', stateSchema);
