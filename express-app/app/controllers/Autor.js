const { getAllAuthors, setAuthor, createAuthor } = require('../services/Author')

module.exports = {
    listAuthors: async (req, res) => {
        try {
            const authors = await getAllAuthors()
            res.json(authors)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    addAuthor: async (req, res) => {
        try {
            const { name, country } = req.body
            const author = await createAuthor(name,country)
            res.json(author)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    updateAuthor: async (req, res) => {
        try {
            console.log(req.body);
            const { name, country} = req.body
            await setAuthor(name,country)
            res.json('success')
        }
        catch (err) {
            res.status(500).send(err)
        }
    }
}