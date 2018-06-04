var mongoose = require('mongoose'),
    equipmentSchema = new mongoose.Schema({
        name: {
            type:String,
            index:1
        },
        category: [String]    
    });

module.exports = mongoose.model('Equipment', equipmentSchema);
