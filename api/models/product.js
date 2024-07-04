const { json } = require('body-parser');
const mongoose = require('mongoose');

//now we make a model for our products
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //simply a long string datatype
    name: {type: String, required:true },
    price: {type: Number, required:true },
    productImage: {type: String, required:true }
});

module.exports = mongoose.model('Product',productSchema);//first aurgment is the name by which we will use them model second is the schema 
