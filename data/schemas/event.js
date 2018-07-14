var mongoose = require('mongoose'),
    user = require('./user'),
    eventSchema = new mongoose.Schema({
        name: {
            type:String,
            index:1,
            required:true
        },
        description: String,
        time: {
            type: Date,
            required:true
        },
        timeCreated: { type: Date, default: Date.now },
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required:true
        },
        place: {
            type: String,
            required:true
        },
        image: String,
        participant:[{
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }],
        category: [String],
        equipment:[{
            name: String,
            current: { type: Boolean, default:false },
            userid: {
              type: mongoose.Schema.ObjectId,
              ref: 'user'            }
        }],
        chat: [{
            user: {
              type: mongoose.Schema.ObjectId,
              ref:'user'
            },
            time: { type: Date, default: Date.now },
            text: String
        }]
    });

module.exports = mongoose.model('Event', eventSchema);
