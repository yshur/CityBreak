'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    consts = require('./consts'),
    Equipment = require('./schemas/equipment'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

exports.getAllEquipments = (req, res) => {
    console.log('getAllEquipments');
    // return data;
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Equipment.find( {},
                (err, equipment) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(equipment);
                    res.status(200).json(equipment);
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
exports.getEquipmentsByCategory = (req, res) => {
    var category = req.params.category;
    console.log('getEquipmentsByCategory');
    console.log(`get: category = ${req.params.category}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Equipment.find( { categories: { $in: [category] } },
                (err, equipment) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(equipment);
                    res.status(200).json(equipment);
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
exports.createEquipment = (req, res) => {
     var name = req.body.name;
    var category = req.body.category;
    var category1 = req.body.category1;
    var category2 = req.body.category2;
    var category3 = req.body.category3;
  console.log('createCategory');
    console.log(`post: name = ${req.body.name},
        category = ${req.body.category}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newEquipment = new Equipment({
              name: name,
                category: [
                    category1, category2, category3
                ]
            });
            newEquipment.save(
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
                      res.status(200).json(newEquipment);
                        console.log(`${category1}, ${category2}, ${category3} added successfully`)
                        //mongoose.disconnect();
                    }
                });
        },
        err =>{
            console.log(`connection error: ${err}`);
        }

  );
};

exports.updateEquipment = (req, res) => {
    var name = req.body.name;
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var conditions = {name: 'knife'}
            update = {'name': name},
            //opts = {multi: true};
            Equipment.update(conditions, update,
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
                        //console.log(`Updated document: ${Equipment}`);
                    }
                })

    });
};
