const { json } = require('body-parser');
const mongoose = require('mongoose');
const product = require('./product');

//now we make a model for our products
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //simply a long string datatype
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required:true}
});

module.exports = mongoose.model('User',userSchema);//first aurgment is the name by which we will use them model second is the schema 
