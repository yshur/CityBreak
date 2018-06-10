'use strice';//JS engine use strict parsing
// var data = require('./data.json');
var mongoose = require('mongoose'),
    consts = require('./consts'),
    User = require('./schemas/user'),
    Chat = require('./schemas/chat'),
    Event = require('./schemas/event'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

exports.createChat = (req, res) => {
    var eventid = req.body.eventid;
    console.log('createChat');
    console.log(`post: eventid = ${req.body.eventid}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newChat = new Chat({
                event: eventid
            });
            newChat.save(
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
                        console.log(`Saved document: ${newChat}`);
                        res.status(200).json(newChat);
                        mongoose.disconnect();
                    }
                });
        },
        err =>{
            console.log(`connection error: ${err}`);
        }
    );     
};
exports.getChat = (req, res) => {
    var chatid = req.params.chatid;
    console.log('getChat');
    console.log(`get: chatid = ${req.params.chatid}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Chat.findOne( { _id: { $eq: chatid } },
                (err, chat) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(chat);
                    res.status(200).json(chat);
                   // mongoose.disconnect();
                }
            )
        }, 
        err => {
            console.log(`connection error: ${err}`);
            res.status(200).json(`{ connection error : ${err}`); 
        }
    ); 
};
