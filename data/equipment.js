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
<<<<<<< HEAD
    var ename = req.body.ename,
        category = req.body.category;
    console.log('createCategory');
    console.log(`post: ename = ${req.body.ename},
        category = ${req.body.category}`);
=======
    var name = req.body.name;
    var category = req.body.category;
    var category1 = req.body.category1;
    var category2 = req.body.category2;
    var category3 = req.body.category3;
>>>>>>> c31f27478350373c3fb749cc47c59b5dbc1a3d49
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newEquipment = new Equipment({
<<<<<<< HEAD
                name: ename,
                category: [category]
=======
                name: name,
                category: [
                    category1, category2, category3
                ]
>>>>>>> c31f27478350373c3fb749cc47c59b5dbc1a3d49
            });
            newEquipment.save(
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
<<<<<<< HEAD
                        console.log(`Saved document: ${newEquipment}`);
                        res.status(200).json(newEquipment);
                        mongoose.disconnect();
=======
                        res.status(200).json(newEquipment);
                        console.log(`${category1}, ${category2}, ${category3} added successfully`)
                        //mongoose.disconnect();
>>>>>>> c31f27478350373c3fb749cc47c59b5dbc1a3d49
                    }
                });
        },
        err =>{
            console.log(`connection error: ${err}`);
        }
<<<<<<< HEAD
    );    
=======
    );
>>>>>>> c31f27478350373c3fb749cc47c59b5dbc1a3d49
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
