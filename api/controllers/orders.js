const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');//for mogodb

exports.orders_get_all = async (req, res, next) => {
    try {
        const docs = await Order.find()
            .select('product quantity _id')
            .populate('product', 'name')
            .exec();

        const response = {
            count: docs.length,
            orders: docs.map(doc => ({
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + doc._id
                }
            }))
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};


exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
      .then(product => {
        if (!product) {
          res.status(404).json({
            message: "Product not found"
          });
          return;
        }
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId
        });
        order.save()
            .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Order stored",
              createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
              },
              request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + result._id
              }
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      })
      
};

exports.orders_get_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
    .populate('product')
    .exec()
    .then(order => {
        console.log("from data base",order);
        if(order){
            res.status(200).json({
                message: 'order found',
                _id: order._id,
                product: order.product,
                quantity: order.quantity,
                request:{
                    message:'to find info on all orders',
                    type: 'GET',
                    url:  'http://localhost:3000/orders/' 
                }

            });
        }
        else{
            res.status(404).json({message: 'no valid entry found'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
}

exports.orders_delete_order = (req, res, next) => {
    const id = req.params.orderId;
    
    Order.deleteOne({ _id: id })
        .exec()
        .then(result => {
            // Logging the result for debugging purposes
            console.log('Delete operation result:', result);

            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Deleted Successfully" });
            } else {
                res.status(404).json({ message: "No ID Found" }); // 404 for not found
            }
        })
        .catch(err => {
            console.log('Error during delete operation:', err);
            res.status(500).json({
                error: err // corrected to use 'error' instead of 'err'
            });
        });
};