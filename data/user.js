var mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        full-name: {
            type:String,
            index:1
        },
        phone: {
            type:String,
            unique : true
        },
        email: {
            type:String,
            unique : true
        },
        password : String,
        image : String      
    });

module.exports = mongoose.model('User', userSchema);
