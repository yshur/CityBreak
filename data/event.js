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
            userEquipments:[{
                equipmentId: {
                    type: Schema.Types.ObjectId,
                    ref:'equipment'
                },
                quantity: Number
            }]
        }],
        category: [String],
        requiredEquipment:[{
            equipmentId: {
                type: Schema.Types.ObjectId,
                ref:'equipment'
            },
            maxQuantity: Number,
            minQuantity: Number,
        }]    
    });

module.exports = mongoose.model('Event', eventSchema);
