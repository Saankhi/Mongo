const express = require('express');  // we are include the express
const app = express();    // server side application is run with express
//const morgon = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const productRoutes = require ('./products');    // In product.js  request  is farward to app.js
const orderRoutes = require('./orders');
const uri='mongodb+srv://SaankhyaKatari:SaankhyaKatari27@cluster0.2ehm6bm.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri).then(res =>{
    console.log('db is connected')
}).catch(err =>{
    console.log('db not connected')
})   //intiate a connection with data base

// app.use(morgon('dev'));
// if we want to use request body then we need body parser
//const { connect } = require('./api/routes/products');
//tell app to use body parser
app.use(bodyparser.urlencoded({extended:false}));
//tell app to user JSON type of body parser
app.use(bodyparser.json());
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Authorization");
   if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET,');
    return res.status(200).json({})
    }
    next();
});

//app.use((req, res, next) => {    // we have to give response,request and this we give three parameters
    //res.status(200).json({       // this is a status is 200 that gives on json method
        //message: 'It Works!'
    //});
 
//});
//Routes which should handle requests
app.use('/products', productRoutes);  // any thing will start with slash products in the url will be farward to router.get in product .js any other
app.use('/orders', orderRoutes);

app.use((req, res, next)=> {     
const error = new Error('Not found');
error.status= 404;
next(error);
})

app.use((error, req, res, next)=> {
res.status(error.status || 500);
res.json({
    error: {
        message:error.message
    }
});
});

module.exports = app;        //in server.js we have to export app.js