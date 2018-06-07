var mongoose = require('mongoose'),
    event = require('./event'),
    user = require('./user'),    
    chatSchema = new mongoose.Schema({
        event: {
          type: mongoose.Schema.ObjectId,
          ref:'event'
       },
        messages: [
            {
                user: {
                  type: mongoose.Schema.ObjectId,
                  ref:'user'
                },
                time: { type: Date, default: Date.now },
                text: String
            }
        ]     
    });

module.exports = mongoose.model('Chat', chatSchema);
