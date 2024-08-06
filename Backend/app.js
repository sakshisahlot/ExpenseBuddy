const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const {readdirSync} = require('fs');
const path = require('path');



const app = express()// using app to call the methods of express

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json() ) //want data to be in json format
app.use(cors({}))


//Routes

//for API routes
app.use('/api/v1', require('./routes/transaction'));

//for Auth routes
app.use('/api/auth', require('./routes/auth'));
// readdirSync('./routes').map((route) => {
//     const routePath = path.join(__dirname, 'routes', route);
//     app.use('/api/v1', require(routePath));
//     app.use("/api/auth", require(routePath));
// });


const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}


server()