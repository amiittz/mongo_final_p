const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: String,
    publishingYear: Number,
    genres: [String],
    authors: [Object],
    quantity: Number,
    price: Number,
});

const Book = model('Book', bookSchema);
module.exports = Book;
