const mongoose = require('mongoose');
const assert = require('assert');
const Author = require('../models/author');

// describe our tests
describe('Nesting records', function(){
    // clear collection first
    beforeEach(function(done){
        mongoose.connection.collections.authors.drop(function(){
            done();
        });
    });

    // create tests

    it('Creates an author with books as embedded documents', function(done){
        let auth = new Author({
            name: "Suzanne Collins",
            books: [
                {title: "The Hunger Games", pages: 374},
                {title: "Catching Fire", pages: 391}
            ]
        });

        //save to database
        auth.save().then(() => {
            // make sure its in there
            Author.findOne({name: "Suzanne Collins"}).then((record) => {
                assert(record.books[0].title === "The Hunger Games" && record.books[1].title === "Catching Fire");
                done();
            }).catch((error) => { // if search fails
                console.log(error);
            });
        }).catch((error) => { // if save fails
            console.log(error);
        });
    });

    // next test
    it('Adds a new book for existing author', function(done) {
        let auth = new Author({
            name: "Suzanne Collins",
            books: [
                {title: "The Hunger Games", pages: 374},
                {title: "Catching Fire", pages: 391}
            ]
        });

        // save to database
        auth.save().then(() => {
            // make sure its in there
            Author.findOne({name: "Suzanne Collins"}).then((record) => {
                // add a book for this author
                record.updateOne({$addToSet: {books: {title: "Mockingjay", pages: 390}}}, function(){
                    // check book was added
                    Author.findOne({name: "Suzanne Collins"}).then((record) => {
                        assert(record.books.length === 3);
                        done();
                    }).catch((error) => { // if search fails
                        console.log(error);
                    });
                })
            }).catch((error) => { // if search fails
                console.log(error);
            });
        }).catch((error) => { // if save fails
            console.log(error);
        });
    });

    // last test
    // next test
    it('Adds age for existing author', function(done) {
        let auth = new Author({
            name: "Suzanne Collins",
            books: [
                {title: "The Hunger Games", pages: 374},
                {title: "Catching Fire", pages: 391}
            ]
        });

        // save to database
        auth.save().then(() => {
            // make sure its in there
            Author.findOne({name: "Suzanne Collins"}).then((record) => {
                // add a book for this author
                record.updateOne({$set: {age: 57}}, function(){
                    // check book was added
                    Author.findOne({name: "Suzanne Collins"}).then((record) => {
                        assert(parseInt(record.age) === 57);
                        done();
                    }).catch((error) => { // if search fails
                        console.log(error);
                    });
                })
            }).catch((error) => { // if search fails
                console.log(error);
            });
        }).catch((error) => { // if save fails
            console.log(error);
        });
    });
});
