const bodyParser = require("body-parser");
const express = require('express');
const AuthorRouter = require("./routes/Autor");
const BookRouter = require("./routes/Book");
const OrerRouter = require("./routes/Order")

const app = express();
app.use(bodyParser.json());
app.use('/api/author',AuthorRouter);
app.use('/api/book', BookRouter);
app.use('/api/order', OrerRouter);

module.exports = app;


