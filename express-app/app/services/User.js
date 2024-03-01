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
    },
    delUser: async (id) => {
        const temp= User.findByIdAndDelete(id);
        return temp;
    },
    addOrder: async (nam,order) => {
        const user = await User.findOne({ name: nam });
        user.orders.push(order);
        await user.save();
        return user;
    },
    delOrder: async (nam,orderid) => {
        const user = await User.findOne({ name: nam });
        user.orders.pull(orderid);
        await user.save();
        return user;
    }
}