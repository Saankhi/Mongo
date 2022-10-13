const express = require('express');
const { default: mongoose } = require('mongoose');
const order = require('./order');
const router = express.Router(); //router is a variable and express is a package we 



// Handle incoming GET requests to /orders
router.get('/',(req, res, next)=>{  //in this we have to get the message put localhost:3000/orders
    res.status(200).json({
        message:'Orders were fetched'
    });
});

router.post('/orderss',(req, res, next)=>{
    const Order = new order({
        _id :new mongoose.Types.ObjectId,
        ProductId: req.body.ProductId, // productid should be given as in stringin postman body at raw
        Quantity : req.body.Quantity
    });
    Order.save().then(result => {
        console.log(result);
    }).catch(error => console.log(error))
    res.status(201).json({    //post method for all orders in json format
        message:'Order was created',
        order: Order
    });
});

router.get('/:orderId',(req, res, next)=>{       // in this we have put localhost:3000/orders/someorderid
    res.status(200).json({
        message:'Order details',              // get method based on order id
        orderId: req.params.orderId
    });
});

router.delete('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message:'Order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;