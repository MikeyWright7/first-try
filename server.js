const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const config = require('config');
const app = express();
const helmet = require('helmet');
// Bodyparser Middleware 
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1/Wright_Final',{
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

// Helmet security
app.use(helmet());
app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0'}));
   
const port = process.env.PORT || 3000;

app.listen(port, ()=> {
        console.log(`Big Brother is always watching & Listening.. ${port}`);
      });