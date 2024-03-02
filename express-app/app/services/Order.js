const Order = require("../models/Order")
const Book = require("../models/Book")
const Author = require("../models/Author")
const mongoose = require('mongoose');

function convertDateFormat(inputDate) {
    
    const [time, date] = inputDate.split(' ');
    const [hours, minutes] = time.split(':');
    const [day, month, year] = date.split('-');

    
    const newDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

    
    return newDate.toISOString();
}

module.exports = {
    getAllOrders: async () => {
        const orders = await Order.find();
        return orders.map(p => ({
            items:p.items,
            totalPrice: p.totalPrice,
            date: p.createdAt.getHours()+":"+p.createdAt.getMinutes()+" "+p.createdAt.getDate()+"-"+(Number(p.createdAt.getMonth())+1)+"-"+p.createdAt.getFullYear() 
        }));
    },
    createOrder: async (items) => { //הוספה
        try{
            let price = 0; // Initialize price with 0
            const orders = [];
            for (const item of items) {
                const book = await Book.findById(new mongoose.Types.ObjectId(item.id));
                if (book.quantity - item.amount > 0) {
                    price += item.amount * book.price;
                    orders.push({
                        _id: new mongoose.Types.ObjectId(item.id),
                        amount: item.amount
                    });
                    await Book.findOneAndUpdate({_id: book.id},{quantity:book.quantity - item.amount})
                }
            }
            if(orders.length)
            {
                const order = new Order({ items: orders, totalPrice: price });
                return await order.save();
            }
            return "ask for less books m8"
        }catch (err) {
            res.status(500).send(err)
        }
    },
    
    findMaxOrder: async(startDate,endDate) =>{
        try {
            let max= 0;
            const orders = await Order.find({createdAt:{$lte:convertDateFormat(endDate), $gte:convertDateFormat(startDate)}})
            if(orders)
            {
                orders.forEach(order =>{
                    if(order.totalPrice> max)
                    {
                        max = order.totalPrice
                    }
                })
                const order = orders.find((element) => element.totalPrice===max)
                console.log(order);
                return order;
            }
            return "no order found"
        } catch (err) {
            res.status(500).send(err)
        }
    },

    get3popular: async(startDate, endDate) =>{
        const genres = {};
        const books = [];
        const orders = await Order.find({createdAt:{$lte:convertDateFormat(endDate), $gte:convertDateFormat(startDate)}});
        for (const order of orders) {
            for (const item of order.items) {
                const book = await Book.findById(item._id);
                books.push(book);
            }
        }
        books.forEach(book =>{
            book.genres.forEach(gener =>{
                if(gener in genres)
                {
                    genres[gener]+=1;
                }
                else{
                    genres[gener]=1;
                }
            })
        })
        if (Object.keys(genres).length<=3) {
            return Object.keys(genres)
        }
        const entries = Object.entries(genres);
        entries.sort(([, valueA], [, valueB]) => valueB - valueA);
        const sortedObject = Object.fromEntries(entries);
        
        return (Object.keys(sortedObject).slice(0,3))
    },

    getTotalProfit : async(startDate, endDate) =>{
        const orders = await Order.find({createdAt:{$lte:convertDateFormat(endDate), $gte:convertDateFormat(startDate)}});
        if(!orders){
            return "no orders found"
        }
        let sum=0
        orders.forEach(order =>{
            sum+=order.totalPrice
        })
        return sum
    },

    getPopularAuthors : async(startDate, endDate) =>{
        const authors = {};
        const books = [];
        const orders = await Order.find({createdAt:{$lte:convertDateFormat(endDate), $gte:convertDateFormat(startDate)}});
        for (const order of orders) {
            for (const item of order.items) {
                const book = await Book.findById(item._id);
                books.push(book);
            }
        }
        books.forEach(book =>{
            book.authors.forEach(auth =>{
                if(auth in authors)
                {
                    authors[auth]+=1;
                }
                else{
                    authors[auth]=1;
                }
            })
        })

        console.log((authors))
        if (Object.keys(authors).length<=5) {
            const reverseArr = Object.keys(authors).reverse()
            const res = []
            console.log(reverseArr)
            for(auth in reverseArr){
                console.log(auth)
                const newAuth = await Author.find({_id : auth._id})
                res.push(newAuth)
            }
            return res
        }
        const entries = Object.entries(authors);
        entries.sort(([, valueA], [, valueB]) => valueB - valueA);
        const sortedObject = Object.fromEntries(entries);
        const ids = Object.keys(sortedObject).slice(0,5).reverse();
        const res = []
        for(auth in ids){
            const newAuth = await Author.find({_id : auth._id})
            res.push(newAuth)
        }
        return res;
    }
}