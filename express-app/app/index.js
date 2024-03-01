const bodyParser = require("body-parser");
const express = require('express');
const AuthorRouter = require("./routes/Autor");
const BookRouter = require("./routes/Book");
const OrerRouter = require("./routes/Order");
const UserRouter = require("./routes/User")
const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/author',AuthorRouter);
app.use('/api/book', BookRouter);
app.use('/api/order', OrerRouter);
app.use('/api/user',UserRouter);

module.exports = app;


