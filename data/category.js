'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    Category = require('./schemas/category');

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
exports.createCategory = (req, res) => {
    var name = req.body.name;
    console.log('createCategory');
    console.log(`post: name = ${req.body.name}`);
    var newCategory = new Category({
        name: name
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

exports.addEquipmentToCategory = (req, res) => {
    var equipment = req.body.equipment;
    var categoryid = req.body.categoryid;
    
    var conditions = { $push: { equipments: equipment } },
    opts = {multi: true};
    Category.findByIdAndUpdate(categoryid, conditions, opts,
        (err, category) => {
            if(err)
                console.log(`err: ${err}`);
            else {
                console.log(`Updated Category: ${category}`)
                res.status(200).json(category);
            }
        })
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