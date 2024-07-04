const express = require('express');//imports express package
const app = express();//creates an express application which can use methods etc
const morgan = require('morgan');//morgan logs requests
const bodyParser = require('body-parser');//for parsing data
const mongoose = require('mongoose');//for mogodb
//adding products router
const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')

//now we use morgan for logs
app.use(morgan('dev'));//dev is just the format 
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));//parses url encoded data only simple ones since set to false
app.use(bodyParser.json());//parsing json data
mongoose.connect('mongodb+srv://user:' + process.env.MONGO_ATLAS_PW + '@cluster0.cqqpetu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
mongoose.promise = global.promise;


//now we step up this to prevent CORS errors we basically are going to allow broswers to use our API
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");//asterik to alllow all urls
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept, Authorization");
    //now to allow all options
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
})
//now we set up actual fliters
//requests targeting products url handled by productRoutes in products file
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes)
//if a request makes it pass the above two filters it is likely an error(couldnt be processed by any of the two urls)
app.use((req, res, next) => {
    const error = new Error('Not found');//make an error
    error.status = 404;//give it code
    next(error);//pass it forward
})

//now we handle all errors thrown ny error creators like the one above
//error, catches all errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;//to export app to module so that it can be imported in server.js