const Author = require("../models/Author")

module.exports = {
    getAllAuthors: async () => {
        const allAuthors = await Author.find();
        return allAuthors.map(p => ({
            name: p.name,
            country: p.country
        }));
    },
    setAuthor: async (name,country) => {//מעדכן מדינה לפי שם
        await Author.updateOne({ name: name }, { $set: { country: country } });
    },
    createAuthor: async (name,country) => { //הוספה
        const author = new Author({name,country});
        return author.save();
    }
}