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
        creator: [{
                    type: mongoose.Schema.ObjectId,
                    ref: 'user',
                    required:true
                }],
        place: {
            type: String,
            required:true
        },
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
        equipment:[{
            equipmentId: String,
            maxQuantity: Number,
            minQuantity: Number,
        }],
        chat: [
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
