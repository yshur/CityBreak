var mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        phone: Number,
        email: {
            type: String,
            required: true
            // ,       unique: true
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        image_url: String,
        inbox: [mongoose.Schema.ObjectId],
        created_tours: [mongoose.Schema.ObjectId],
        saved_tours: [mongoose.Schema.ObjectId],
        feedback_num: {
          type: Number,
          default: 0
        },
        family_status: String,
        birthdate: Date,
        living_area: String,
        living_city: String,
        health_condition: Number,
        accessibility: [String],
        profession: String,
        about: String,
        tags: [String],
        popularity: {
          type: Number,
          default: 0
        },
        calendar: mongoose.Schema.ObjectId,
        friends: [mongoose.Schema.ObjectId],
        is_admin: {
          type: Boolean,
          default: false
        },
        setup_time: { type: Date, default: Date.now }
    });

module.exports = mongoose.model('User', userSchema);
