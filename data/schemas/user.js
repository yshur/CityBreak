var mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        full_name: {
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

    userSchema.path('full_name').set(
        (val) => {
            let sVal = String(val).toUpperCase();
            console.log(`capitalized: ${sVal}`);
            return sVal;
        })
    userSchema.path('phone').validate(
        (val) => {
            return /\d{3}-\d{3}-\d{4}/.test(val);
        }, `Error validation phone number! \n The template should be xxx-xxx-xxxx`);
    userSchema.path('email').validate(
        (val) => {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val);
        }, `The e-mail field cannot be empty.`);

module.exports = mongoose.model('User', userSchema);
