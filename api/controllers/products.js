const Product = require('../models/product');
const mongoose = require('mongoose');//for mogodb

exports.products_get_all = async (req, res, next) => {
    try {
        const docs = await Product.find()
            .select('name price _id productImage')
            .exec();

        const response = {
            count: docs.length,
            products: docs.map(doc => ({
                name: doc.name,
                price: doc.price,
                _id: doc._id,
                productImage: doc.productImage,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + doc._id
                }
            }))
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

exports.products_create = async (req, res, next) => {
    try{
        console.log(req.file);//req.file is now avalible due to upload.single

        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        });
    
        const result = await product.save();
        console.log(result);
        res.status(201).json({
            message: 'Created product succesfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                
                request:{
                    type: 'GET',
                    url:  'http://localhost:3000/products/' + result._id
                }
            }
        });
    }
    
    catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

exports.products_get_one = (req, res, next) => {
    //to extract ID
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
        console.log("from data base",doc);
        if(doc){
            res.status(200).json({
                message: 'product found',
                foundProduct:{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    request:{
                        message:'to find info on all products',
                        type: 'GET',
                        url:  'http://localhost:3000/products/' 
                    }
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

exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.findByIdAndUpdate({ _id: id }, {$set: updateOps}).
    exec().
    then(result => {
        console.log(result);
        res.status(200).json(
            {
                message: "product updated",
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            }
        )
    }).
    catch(error => {
        res.status(500).json({
            error: err
        });
    });
}

exports.products_delete = (req, res, next) => {
    const id = req.params.productId;
    
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            console.log();
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Deleted Successfully" });
            } else
                res.status(500).json({ error: "No ID Found" });
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
}