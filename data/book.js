var mongoose = require('mongoose'),
    bookSchema = new mongoose.Schema({
        book_name: {
            type:String,
            index:1
        },
        author: String,
        categories: [String],
        borrow_date: String,
        return_date: String,
        borrower: {
            name: String,
            email: String,
            phone: String
        }      
    });

module.exports = mongoose.model('Book', bookSchema);
