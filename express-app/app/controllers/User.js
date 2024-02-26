const { getAllUsers , createUser} = require('../services/User')

module.exports = {
    UserList: async (req, res) => {
        try {
            const users = await getAllUsers()
            res.json(users)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    addUser: async (req, res) => {
        try {
            const {name,password} = req.body;
            const temp = await createUser(name,password);
            res.json(temp);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
}