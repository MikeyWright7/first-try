const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
require ('dotenv').config();
const app = express();

// Bodyparser Middleware 
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}))


mongoose.connect(process.env.DATABASE_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
    .then(() => console.log("We Are Connected"))
    .catch(err => console.log(err));

// Use routes
app.use('/routes/user', require('./routes/user'));
app.use('/routes/products', require('./routes/products'));
app.use('/routes/auth', require('./routes/auth'));
app.use('/routes/update', require('./routes/update'));


   
const port = process.env.PORT || 8080;

app.listen(port, ()=> {
        console.log(`Big Brother is always watching & Listening.. ${port}`);
      });