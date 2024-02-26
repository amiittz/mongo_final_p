const { getAllOrders , createOrder, findMaxOrder,get3popular, getTotalProfit, getPopularAuthors} = require('../services/Order')

module.exports = {
    listOrder: async (req, res) => {
        try {
            const orders = await getAllOrders()
            res.json(orders)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },

    AddOrder: async (req, res) => {
        try {
            const {items} = req.body;
            const order = await createOrder(items);
            res.json(order)
        }
        catch (err) {
            res.status(500).send(err)
        }
    },

    maxOrder: async (req,res) =>{
        const{startDate,endDate} = req.body;
        const order = await findMaxOrder(startDate,endDate);
        res.json(order)
    },

    popularOrders: async (req,res) =>{
        const{startDate,endDate} = req.body;
        const order = await get3popular(startDate,endDate);
        res.json(order)
    },

    totalProfit : async (req,res) =>{
        const{startDate,endDate} = req.body;
        const order = await getTotalProfit(startDate,endDate);
        res.json(order)
    },
    popularAuthors : async (req,res) =>{
        const{startDate,endDate} = req.body;
        const order = await getPopularAuthors(startDate,endDate);
        res.json(order)
    },
}