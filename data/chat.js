var mongoose = require('mongoose'),
    event = require('./event'),
    user = require('./user'),    
    chatSchema = new mongoose.Schema({
        event: {
          type: Schema.Types.ObjectId,
          ref:'event'
       },
        messages: [
            {
                user: {
                  type: Schema.Types.ObjectId,
                  ref:'user'
                },
                time: Date,
                text: String
            }
        ]     
    });

module.exports = mongoose.model('Chat', chatSchema);
