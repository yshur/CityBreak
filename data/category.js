'use strice';//JS engine use strict parsing

var mongoose = require('mongoose'),
    consts = require('./consts'),
    Category = require('./schemas/category'),
    options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };

exports.getAllCategories = (req, res) => {
    console.log('getAllCategories');
<<<<<<< HEAD
=======
    // return data;
>>>>>>> c31f27478350373c3fb749cc47c59b5dbc1a3d49
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            Category.find( {},
                (err, category) => {
                    if (err) {
                        console.log(`err: ${err}`);
                        res.status(200).json(`{ err : ${err}`);
                    }
                    console.log(category);
                    res.status(200).json(category);
                   // mongoose.disconnect();
                }
            )
        }, 
        err => {
            console.log(`connection error: ${err}`);
            res.status(200).json(`{ connection error : ${err}`); 
        }
<<<<<<< HEAD
    ); 
};
exports.createCategory = (req, res) => {
    var cname = req.body.cname;
    console.log('createCategory');
    console.log(`post: cname = ${req.body.cname}`);
=======
    );   
};

exports.createCategory = (req, res) => {
    var name = req.body.name;
    
>>>>>>> c31f27478350373c3fb749cc47c59b5dbc1a3d49
    mongoose.connect(consts.MLAB_KEY)
    .then(
        () => {
            var newCategory = new Category({
<<<<<<< HEAD
                name: cname
=======
                name: name
>>>>>>> c31f27478350373c3fb749cc47c59b5dbc1a3d49
            });
            newCategory.save(
                (err) => {
                    if(err)
                        console.log(`err: ${err}`);
                    else {
<<<<<<< HEAD
                        console.log(`Saved document: ${newCategory}`);
                        res.status(200).json(newCategory);
                        mongoose.disconnect();
=======
                        res.status(200).json(newCategory);
                        console.log(`Category ${name} added successfully`);
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
};
=======
    );
};

exports.updateCategory = (req, res) => {};
>>>>>>> c31f27478350373c3fb749cc47c59b5dbc1a3d49
