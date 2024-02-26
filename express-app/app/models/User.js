const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    pass: String,
    orders: [Schema.Types.ObjectId]
});

const User = model('User', userSchema);
module.exports = User;
