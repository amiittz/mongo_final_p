const { getAllUsers , createUser, delUser,addOrder,delOrder} = require('../services/User')

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
    deleteUser: async(req,res)=>{
        try {
            const {id} =req.body;
            
            res.json(await delUser(id));
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    addOrderes: async(req,res)=>{
        try {
            const {name,order} =req.body;
            res.json(await addOrder(name,order));
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    delOrderes: async(req,res)=>{
        try {
            const {name,orderid} =req.body;
            res.json(await delOrder(name,orderid));
        }
        catch (err) {
            res.status(500).send(err)
        }
    }
}