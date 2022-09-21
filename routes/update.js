const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');


// Update User 
router.post('/', (req, res) => {
    console.log(req.body)
    const { userId, newEmail, password, newpassword } = req.body;
    const id = userId;

    if (!newEmail) {
        User.findById(userId)
            .then(user => {
                if (newpassword !== '') {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (!isMatch) {
                            res.status(400).json({ msg: 'The password you entered does not match what we have on file for this account.' });
                        } else {
                            user.password = newpassword;
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(user.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    user.password = hash;
                                    user.save();
                                    return res.status(200).json({ msg: `${user.name}, your password has been updated!` });
                                })
                            })
                        }


                    })

                }
            })
            .catch(err => {
                console.log(err)
            })
        // Change email and password
    } else if (newEmail && newpassword) {
        User.find({ email: newEmail })
            .then(match => {
                if (match._id !== undefined) {
                    res.json({ msg: 'That email is already in use' })
                } else {
                    console.log('1')
                    User.findById(userId)
                        .then(user => {
                            console.log('2')
                            user.email = newEmail;
                            bcrypt.compare(password, user.password, (err, isMatch) => {
                                if (!isMatch) {
                                    res.json({ msg: 'The password you entered does not match what we have on file, please try again' });
                                } else {
                                    user.password = newpassword;
                                    bcrypt.genSalt(10, (err, salt) => {
                                        bcrypt.hash(user.password, salt, (err, hash) => {
                                            if (err) throw err;
                                            console.log('3')
                                            user.password = hash;
                                            user.save();
                                            return res.json({ msg: `${user.name}, Your password has been changed, and email has been updated to ${newEmail}` });
                                        })
                                    })
                                }

                            })
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
        // Change email only            
    } else if (newEmail != '' && !newpassword) {
        User.find({ email: newEmail })
            .then(match => {
                console.log(match._id)
                if (match._id !== undefined) {
                    return res.json({ msg: 'That email is already registered' })
                }
                else {
                    User.findById(userId)
                        .then(user => {
                            user.email = newEmail;
                            user.save();
                            return res.json({ msg: `${user.name}, Your email has been updated to ${newEmail}`, user: user });
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
});

router.post('/delete-user', (req, res) => {
    
    const {userId} = req.body;
    
    User.findById(userId)
        .then(user => {
            user.remove()
            res.json({status: 200})
        })
        .catch(err => res.status(404).json({success: false}))
});

router.post('/purchase', (req, res) => {
    const {userId} = req.body;

    User.findById(userId)
    .then(user => {
        user.cart = [];
        user.save()
        .then(() => {
            res.json({status: 200})
        })
    })
    .catch(err => res.status(404).json({success: false}))
})
module.exports = router;    
