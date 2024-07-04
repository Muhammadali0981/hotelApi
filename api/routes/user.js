const express = require('express');//imports express package
const router = express.Router();//imports router to manage routes

const UserControllers = require ('../controllers/user');

router.post('/signup', UserControllers.user_signup);

router.post('/login', UserControllers.user_login );

router.delete('/:userId', UserControllers.user_delete);


module.exports = router;