const Book = require("../models/Book")
const author = require("../models/Author");

module.exports = {
    getAllBooks: async () => {
        const allBooks = await Book.find();
        return allBooks.map(p => ({
            title: p.title,
            publishingYear: p.publishingYear,
            genres: p.genres,
            authors: p.authors,
            quantity: p.quantity,
            price: p.price
        }));
    },
    createBook: async (title,publishingYear,genres,authors,quantity,price) => { //הוספה
        try{
        const existingAuthor = await author.findOne({ _id: authors._id });//בדיקה לפי הID
        if (existingAuthor){
            const book = new Book({title,publishingYear,genres,authors,quantity,price});
            return book.save();
        }else{
            return "author dont exists";
        }
        }catch (err) {
            res.status(500).send(err)
        }
    },
    delBook: async(id)=>{
        const temp= Book.findByIdAndDelete(id);
        return temp;
    },
    searchName: async(bookName) => {
        const temp= Book.find({title:{ $regex: bookName, $options: 'i' }});
        return temp;
    },
    searchGenre: async(genre) => {
        const temp= Book.find({genres:genre});
        return temp;
    },
    searchYear: async(s,e)=>{
        const temp=Book.find({ publishingYear: { $gte: s, $lte: e } });
        return temp;
    },
    searchCountry: async(c)=>{
        const books = Book.aggregate([
            {
              '$unwind': {
                'path': '$authors', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$match': {
                'authors.country': c
              }
            }
          ])
          return books
    },
}