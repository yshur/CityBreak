var consts = require('./data/consts'),
    mongoose = require('mongoose');
    
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(consts.MLAB_KEY, { useNewUrlParser: true });

var options = {
    autoReconnect :true,
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(consts.MLAB_KEY)
.then(
    () => {
        console.log('connected');
    },
    err => {
        console.log(`connection error: ${err}`);
    }
 );

