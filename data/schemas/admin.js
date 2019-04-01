var mongoose = require('mongoose'),
    adminSchema = new mongoose.Schema({
        name: {
            type:String,
            index:1
        },
        phone: {
            type:String
        },
        email: {
            type:String

        },
        password : String,
        image : String
    });

    // adminSchema.path('phone').validate(
    //     (val) => {
    //         return /\d{3}-\d{3}-\d{4}/.test(val);
    //     }, `Error validation phone number! \n The template should be xxx-xxx-xxxx`);
    // adminSchema.path('email').validate(
    //     (val) => {
    //         return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val);
    //     }, `The e-mail field cannot be empty.`);

module.exports = mongoose.model('Admin', adminSchema);
