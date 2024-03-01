const app = require("./app");
const mongoose = require("mongoose");

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const run = async () => {
    try {
        const port = process.env.PORT || "3001";
        await mongoose.connect('mongodb+srv://amitgtima:DnOZU23BNv1ENWbK@cluster0.1jgbsyj.mongodb.net/books_api');
        app.listen(port, () => console.log(`Listening on port: ${port}`));
    }
    catch (err) {
        console.log(`FAILED TO START: ${err}`)
    }
}

run();

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0);
});

