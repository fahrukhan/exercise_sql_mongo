var model = require("../models/index.js");

module.exports = function(app){

    app.get('/test', function(req, res){
                res.json({message: "Connection  OK"})
    });

    //GET
    app.get('/books', function(req, res, next){
        model.Book.findAll({})
            .then(books =>
                res.json({
                    error: false,
                    data: books
                })
            )
            .catch(error => 
                res.json({
                    data: [],
                    error: error
                })
            );
    });

    // POST
    app.post("/addbook", function(req, res, next) {
        const {title,author,published_date,pages,language} = req.body;
        model.Book.create({
            title: title,
            author: author,
            published_date: published_date,
            pages: pages,
            language: language
        })
        .then(book => 
            res.status(201).json({
                error: false,
                data: book,
                message: "Data has been created"
            })
        )
        .catch(error =>
            res.json({
                error: true,
                data: [],
                error: error
            })
        );
    });

    //update
    app.put("/book/:id", function(req, res, next) {
        const book_id = req.params.id;
        const {title,author,published_date,pages,language} = req.body;

        model.Book.update(
            {
                title: title,
                author: author,
                published_date: published_date,
                pages: pages,
                language: language
            },
            {
                where: {
                    id: book_id
                }
            }
        )
        .then(book => 
            res.json({
                error: false,
                message: "Data has been updated"
            })
        )
        .catch(error =>
            res.json({
                error: true,
                error: error
            })
        );
    });

    //DELETE
    app.delete('/book/:id', function(req, res, next) {
        const book_id = req.params.id;

        model.Book.destroy({
            where: {
                id: book_id
            }
        })
        .then(status =>
            res.json({
                error: false,
                message: "Data has been delete"
            })
        )
        .catch(error => 
            res.json({
                error: true,
                error: error
            })
        );
    });
    

}