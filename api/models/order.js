const { json } = require('body-parser');
const mongoose = require('mongoose');
const product = require('./product');

//now we make a model for our products
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //simply a long string datatype
    product: { type: mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
    quantity: {type: Number, default:1 }//if quantity is passed use that other wise it is 1
});

module.exports = mongoose.model('Order',orderSchema);//first aurgment is the name by which we will use them model second is the schema 
