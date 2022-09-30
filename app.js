// we import the package
const express = require('express');
// we excicute it 
const app = express();
// we import the mongoose package
const mongoose = require('mongoose');
// we import the parser
const bodyParser = require('body-parser');
// require package {I think it's import}
require('dotenv/config');

//create one of those middlewares: any time we hit any request => bodyParser run
app.use(bodyParser.json());

// import routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//ROUTES (create ROUTES)
app.get('/', (req, res) =>{
    res.send('We are on home');
})

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log('connected to DB');
})


//How to we start listening to the server 
app.listen(3001);
