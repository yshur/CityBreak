var mongoose = require('mongoose'),
    user = require('./user'),
    chatSchema = new mongoose.Schema({
        userA: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: true
        },
        userB: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: true
        },
        setup_time: { type: Date, default: Date.now },
        messages: [{
            sender: {
              type:mongoose.Schema.ObjectId,
              ref: 'user',
              required: true
            },
            send_time: { type: Date, default: Date.now },
            content: String
          }]
        });

module.exports = mongoose.model('Chat', chatSchema);
