'use strice';//JS engine use strict parsing
var mongoose = require('mongoose'),
    consts = require('./consts'),
    User = require('./schemas/user'),
    Tour = require('./schemas/tour'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

