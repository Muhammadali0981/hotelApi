const express = require('express');//imports express package
const router = express.Router();//imports router to manage routes


const checkAuth = require('../middleware/check-auth');
//to handle get requests for url "orders" which we fliter through the app.js file
const OrdersControllers = require ('../controllers/orders');

router.get('/',checkAuth, OrdersControllers.orders_get_all);
//now for post method
router.post('/', checkAuth, OrdersControllers.orders_create_order);
//get by id
router.get('/:orderId', checkAuth, OrdersControllers.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersControllers.orders_delete_order);


module.exports = router;//so that router can be used in other files