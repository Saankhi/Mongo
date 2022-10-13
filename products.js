const express = require('express');
const router = express.Router(); //router is a variable and express is a package we 
const mongoose = require('mongoose');
const product = require('./product');

router.get('/', (req, res, next)=>{      // localhost:3000/products  // get means we have to give get request//in this we must not use any slash products again because alreadt we have to give the path in app.js if we give it give 2 times in url
    //res.status(200).json({
        //message:'Handling GET requests to /products',
        product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            //if(docs.length >= 0) {
                res.status(200).json(docs);
            //} else {
                //res.status(404).json({
                    //message: 'No entries found'
                //});
            //}
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
    });

router.post('/product', (req, res, next)=>{
    //const product = {
    //name: req.body.name,
    //price :req.body.price
    //};
    const Product = new product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    Product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:"Handling POST request to /products",
            //createdProduct: Product
             createdProduct: Product
        });
        })
    .catch(err=> {
     console.log(err);
     res.status(500).json({
        error:err
     });
     //res.status(201).json({
        //message:"Handling POST request to /products",
        //createdProduct: Product
    //});
    });
});
router.get('/:productId', (req, res, next)=> {    // localhost:3000/products/special 
    const id = req.params.productId;     // para means parameters
    //if(id === 'special') {
        //res.status(200).json({
            //message:'You discovered the special ID',        // if we get any we use this
            //id: id
//});
    //}else{
        //res.status(200).json({
           // message:'You passed an ID'                 // if we get any special you have give an id in output
        product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
         console.log(err);
         res.status(500).json({error: err});
         });
        });

router.patch('/:productId',(req, res, next)=> {
        //res.status(200).json({
            //message:'Updated product!',
            const id = req.params.productId; 
            const updateOps = {};    // it is a object
            for (const ops of req.body) {                                //{ name: req.body.newName,price: req.body.newPrice}}); 
                updateOps[ops.propName] = ops.value;   //going inside a object and set a new value
            }
            product.update({ _id: id} , {$set: updateOps})
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
                })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });                                  
//});
});

router.delete('/:productId',(req, res, next)=> {
    const id = req.params.productId;
    product.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       });
    });
});
    //res.status(200).json({
       // message:'Deleted product!',npm start
       
//});

module.exports = router;