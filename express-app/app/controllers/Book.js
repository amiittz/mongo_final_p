const { getAllBooks, createBook, delBook, searchName, searchGenre,searchYear,searchCountry} = require('../services/Book')
const Author = require("../models/Author");


module.exports = {
    listBooks: async (req, res) => {
        try {
            const books = await getAllBooks()
            res.json(books)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    addBook: async (req, res) => {
        try {
            const {title,publishingYear,genres,authors,quantity,price} = req.body;
            const book = await createBook(title,publishingYear,genres,authors,quantity,price)
            res.json(book)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    deleteBook: async (req, res) => {
        try {
            const book_id =req.body;
            res.json(await delBook(book_id));
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    searchByName: async (req, res) =>{
        try{
            const {title}=req.body;
            res.json(await searchName(title));
        }catch (err) {
            res.status(500).send(err)
        }
    },
    searchByGenre: async (req, res) =>{
        try{
            const {genre}=req.body;
            res.json(await searchGenre(genre));
        }catch (err) {
            res.status(500).send(err)
        }
    },
    searchByYear:async (req, res) =>{
        try{
            const {start, end}= req.body;
            res.json(await searchYear(start, end));
        }catch (err) {
            res.status(500).send(err)
        }
    },
    searchByCountry:async (req, res) =>{
        try{
            const {country}= req.body;
            res.json(await searchCountry(country));
        }catch (err) {
            res.status(500).send(err)
        }
    },
}