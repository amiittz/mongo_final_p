const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const orderItemSchema = new Schema({
    bookId: {type: Schema.Types.ObjectId},
    amount: Number,
});
const orderSchema = new Schema({
    items:[orderItemSchema],
    totalPrice: Number,
}, { timestamps: true });
const Order = model('Order', orderSchema);
module.exports = Order;
