var consts = require('./data/consts'),
    mongoose = require('mongoose');
    mongoose.connect(consts.MLAB_KEY);

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
<<<<<<< HEAD
 );
=======
 );
>>>>>>> 56a6717b7bb2c2a5058c1ed1654a4f714076eb06
