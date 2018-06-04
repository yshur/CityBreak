var mongoose = require('mongoose'),
    user = require('./user'),
    equipment = require('./equipment'),
    eventSchema = new mongoose.Schema({
        name: {
            type:String,
            index:1
        },
        decription: String,
        time: Date,
        creator: {
            type: Schema.Types.ObjectId,
            ref:'user'
        },
        place: String,
        participants:[{
            user: {
                type: Schema.Types.ObjectId,
                ref:'user'
            },
            status: { 
                type: String, 
                enum: ['new', 'admin', 'active', 'delete' ] 
            },
            user-equipments:[{
                equipment-id: String,
                quantity: Number
            }]
        }],
        category: [String],
        required-equipment:[{
            equipment-id: String,
            max-quantity: Number,
            min-quantity: Number,
        }]    
    });

module.exports = mongoose.model('Event', eventSchema);
