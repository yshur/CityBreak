'use strice';//JS engine use strict parsing
// var data = require('./data.json');
var mongoose = require('mongoose'),
    consts = require('./consts'),
    User = require('./schemas/user'),
    Chat = require('./schemas/chat'),
    Event = require('./schemas/event'),
    Category = require('./schemas/category'),
    Equipment = require('./schemas/equipment'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

