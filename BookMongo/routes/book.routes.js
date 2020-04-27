const express = require('express');
const bookRouter = express.Router();
const Book = require('../model/book.model');

bookRouter.route('/android').get(function (req, res) {res.send("OK")});

// add book
bookRouter.route('/book/add').post(function (req, res){
    let book = new Book(req.body);
    book.save((err) => {
        if(err){
            return next(err);
        }
        res.send("Book added successfully");
    })
});

// show all book
bookRouter.route('/books').get(function (req, res){
    Book.find(function (err, books){
        if(err){
            return next(err)
        }else{
            res.json(books)
        }
    })
});

// single show by id
bookRouter.route('/book/:id').get(function (req, res){
    Book.findById(req.params.id, function (err, books){
        if(err){
            return json(err)
        }else{
            res.json(books)
        }
    })
});

//update
bookRouter.route('/update/:id').post(function (req, res) {
    Book.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
        if (err) {return next(err)}
        else {res.json({"message":"Update Successfully"})}
    });
});

// delete book
bookRouter.route('/delete/:id').get(function (req, res) {
    Book.findByIdAndRemove(req.params.id, (err) => {
        if(err) res.json(err)
        else res.json('Succesfully removed')      
    });
});


module.exports = bookRouter;