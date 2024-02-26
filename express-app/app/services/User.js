const User = require("../models/User");
const Order = require("../models/Order");


module.exports = {
    getAllUsers: async () => {
        const all = await User.find();
        console.log(all[0])
        return all.map(p => ({
            name: p.name,
            password: p.pass,
            orders: p.orders
        }));
    },
    createUser: async (name,pass) => {
        const arr = []
        const temp = new User({name,pass,arr});
        return await temp.save();
    }
}