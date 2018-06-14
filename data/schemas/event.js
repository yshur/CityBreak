var mongoose = require('mongoose'),
    user = require('./user'),
    eventSchema = new mongoose.Schema({
        name: {
            type:String,
            index:1
        },
        decription: String,
        time: Date,
        timeCreated: { type: Date, default: Date.now },
        creator: [{
                    type: mongoose.Schema.ObjectId,
                    ref: 'user'
                }],
        place: String,
        participants:[{
            user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'user'
                },
            status: { 
                type: String, 
                enum: ['new', 'admin', 'active', 'delete' ] 
            },
            userEquipments:[{
                equipmentId: {
                    type: mongoose.Schema.ObjectId,
                    ref:'equipment'
                },
                quantity: Number
            }]
        }],
        category: [String],
        requiredEquipment:[{
            equipmentId: {
                type: mongoose.Schema.ObjectId,
                ref:'equipment'
            },
            maxQuantity: Number,
            minQuantity: Number,
        }],
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

module.exports = mongoose.model('Event', eventSchema);
