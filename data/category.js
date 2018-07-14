'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    Category = require('./schemas/category');

exports.getAllEquipments = (req, res) => {
    console.log('getAllEquipments');
    Category.find( {},
        (err, category) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(category);
            res.status(200).json(category);
        }
    )
};
exports.getAllCategories = (req, res) => {
    console.log('getAllCategories');
    Category.find( {},
        (err, category) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(category);
            res.status(200).json(category);
        }
    )
};
exports.getCategory = (req, res) => {
    var category = req.params.category;
    console.log('getCategory');
    console.log(`get: category = ${req.params.category}`);

    Category.find( { name: { $eq: category } },
        (err, equipment) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(200).json(`{ err : ${err}`);
            }
            console.log(equipment);
            res.status(200).json(equipment);
        }
    )
};

exports.addEquipment = (req, res) => {
    var equipment = req.body.equipment;
    var category = req.body.category;
    console.log('addEquipment');
    console.log(`post: equipment = ${req.body.equipment},
      category = ${req.body.category}`);
      var newCategory = new Category({
            name: category,
            equipment: equipment
        });
        newCategory.save(
            (err) => {
                if(err)
                    console.log(`err: ${err}`);
                else {
                    console.log(`Saved document: ${newCategory}`);
                    res.status(200).json(newCategory);
                }
            });
}

exports.deleteCategory = (req, res) => {
    var categoryid = req.body.categoryid;
    var conditions = {_id: categoryid};

    Category.remove(conditions,
        (err) => {
            if(err){
                console.log(`err: ${err}`);
                res.status(300).json(err);
            } else {
                console.log(`Removed document`);
                Category.findOne({_id: categoryid},
                    (err) => {
                        console.log(`Removed category id=${categoryid} `);
                        res.status(200).json({result: `Removed ${categoryid}`});
                    });
            };
        });
};
