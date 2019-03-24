var mongoose = require('mongoose'),
    categorySchema = new mongoose.Schema({
        name: {
            type:String,
            index:1
        },
        equipment: String
    });

module.exports = mongoose.model('Category', categorySchema);
