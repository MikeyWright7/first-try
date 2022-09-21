const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')


// Authenticate User 
router.post('/', (req, res) => {

    const { email, password } = req.body;
    
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: 'Unauthorized User' })
            };
            // Validate Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ msg: 'Password does not match' })
                    }

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
        })
});


// Get user data

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => {
        var newuser = {
        id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin
    }
        res.json(newuser)});
})


// Load users cart 

router.post('/loadCart' , (req, res) => {
    const {userId} = req.body;
    User.findById(userId)
    .then(user => {
        res.json({cart: user.cart})
    }).catch(err => console.log(err))
} )

module.exports = router