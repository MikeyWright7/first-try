const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const config = require('config');
const jwt = require('jsonwebtoken');


//  Register handle 
router.post('/', (req, res) => {

    const { name, email, age, password, passwordTwo } = req.body;
    

    if (!name || !email || !age || !password || !passwordTwo) {
        return res.status(400).json({ msg: 'Please Fill In All Fields' })
    }
    // Check for age to be above 18

    if (age < 18) {
        return res.status(400).json({ msg: 'Must Be 18 Years Of Age' })
    }
    // Check passwords match

    if (password !== passwordTwo) {
        return res.status(400).json({ msg: 'Passwords Do Not Match' })
    }
    // Check password length

    if (password.length < 6) {
        return res.status(400).json({ msg: 'Password Must Be 6 Characters Long' })
    }
    // User already exists 

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: 'Email is already registered' });
            } else {
                const newUser = new User({
                    name,
                    email,
                    age,
                    password,
                    admin: false
                });
                if(email === 'admin@store' && password === 'password'){
                    newUser.admin = true
                }
                // Hash password

                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            admin: user.admin,
                                            cart: user.cart
                                        }
                                    })
                                }
                            )

                        })

                }))
            }
        });

});


module.exports = router