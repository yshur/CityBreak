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
    console.log(`post: ename = ${req.body.ename},
                category = ${req.body.category}`);
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newEquipment = new Equipment({
                name: name,
                category: [
                    category, category1, category2, category3
                ]
            });
            newEquipment.save(
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
                        console.log(`Saved document: ${newEquipment}`);
                        res.status(200).json(newEquipment);
                        //mongoose.disconnect();
                    }
                });
        },
        err =>{
            console.log(`connection error: ${err}`);
        }
    );    
};

exports.updateEquipment = (req, res) => {}
    /*var equipmentid = req.params.equipmentid;
    var category = req.body.category;
    var category1 = req.body.category1;
    var category2 = req.body.category2;
    var category3 = req.body.category3;
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
                var conditions = {category: {$set :{category1: category1, 
                                category2: category2, category3:category3}}}//: category1}, category2: category[1], category3: category[2]}
                //opts = {multi: true};
                Equipment.findByIdAndUpdate(equipmentid, conditions, 
                    (err, equipment) => {
                        if(err)
                            console.log(`err: ${err}`);
                        else {
                            console.log(`Updated user: ${equipment}`)
                            res.status(200).json(equipment);
                        }
                    })
        });

}*/