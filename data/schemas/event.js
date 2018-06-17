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
            userid: {
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            },
            status: { 
                type: String, 
                enum: ['new', 'admin', 'active', 'delete' ] 
            },
            userEquipments:[{
                equipmentName: String,
                quantity: Number
            }]
        }],
        category: [String],
        equipment:[
        {
            equipmentName: String,
            max_quantity: Number,
            min_quantity: Number,
        }
        ],
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
