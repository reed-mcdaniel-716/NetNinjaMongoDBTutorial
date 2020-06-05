// MongoDB data model for different authors and their books
const mongoose = require('mongoose');
// getting schema pyototype/class
const Schema = mongoose.Schema;

//---------------- Part 1: creating schema and model ----------------

// creating new schemas

// a Book instance can have any or none of the below fields
    // but nothing that is not listed
const BookSchema = new Schema({
    title: String,
    pages: Number
});

// a Author instance can have any or none of the below fields
    // but nothing that is not listed
const AuthorSchema = new Schema({
    name: String,
    age: Number,
    // array of books based on BookSchema
    books: [BookSchema]
});
// every new author should be based on the above schema
const Author = mongoose.model('author', AuthorSchema);

// export for use elsewhere
module.exports = Author;
