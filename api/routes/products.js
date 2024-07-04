const express = require('express');//imports express package
const router = express.Router();//imports router to manage routes
const mongoose = require('mongoose');
//now we import the model 
const Product = require('../models/product');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsControllers = require ('../controllers/products');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 *5
}});
//to handle get requests for url "products" which we fliter through the app.js file

//now we set up the same req,res,next fucntion
router.get('/', ProductsControllers.products_get_all);

//now for post method
router.post('/',checkAuth ,upload.single('productImage'), ProductsControllers.products_create);

//now we send an id with the request
router.get('/:productId', ProductsControllers.products_get_one);

//adding patch and delete routes
router.patch('/:productId', checkAuth, ProductsControllers.products_update_product);

router.delete('/:productId', checkAuth, ProductsControllers.products_delete);

module.exports = router;//so that router can be used in other files