var consts = require('./data/consts'),
    mongoose = require('mongoose');
    mongoose.connect(consts.MLAB_KEY);
//define the MODEL
//var Ideas = require('./models/idea'),
  //  options = {
    //autoReconnect :true
//};
mongoose.connect(consts.MLAB_KEY)
.then(
    () => {
        console.log('connected');
    },
    err => {
        console.log(`connection error: ${err}`);
    }
 );