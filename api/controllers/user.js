const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');



exports.user_signup = (req, res, next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1){
            return res.status(409).json({
                message: 'user with this email alreday exists'
            })
        }
        else{
            password: bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }
                else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'user created successfully'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            })
        }
    })

}

exports.user_login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user.lenght < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    }); 
                }

                if(result){
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        },
                        process.env.JWT_KEY,
                        {expiresIn: "1h"}
                    )
                    return res.status(200).json({
                        message: 'loged in',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}


exports.user_delete = (req, res, next) => {
    const id = req.params.userId;
    
    User.deleteOne({ _id: id })
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