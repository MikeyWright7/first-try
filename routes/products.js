const express = require('express');
const router = express.Router();


// Item Model
const Product = require('../model/Products');
// User Model
const User = require('../model/User');



router.get('/', (req, res) => {
    Product.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});




router.post('/addNewItem', (req, res) => {

    const { name, category, price, description, image } = req.body;
    const product = new Product({
        name,
        category,
        price,
        description,
        image
    });
    product.save().then(item => res.json(item));
});

router.post('/seed', (req, res) => {
    const seed1 = new Product({
        
        availability: false,
        name: "Michael",
        category: "Automobile",
        price: 165465,
        description: "run ",
        image: "/img/car.jpg",
        __v: 0
    })
    seed1.save()
    const seed2 = new Product({
        availability: false,
        name: "Toy Food",
        category: "Children",
        price: 19.99,
        description: "Toy",
        image: "/img/toy.jpg",
        __v: 0
    })
    seed2.save()
    const seed3 = new Product({
        availability: false,
        name: "Cutlery Set",
        category: "Kitchen ware",
        price: 99.99,
        description: "Cutlery",
        image: "/img/cutlery.jpg",
        __v: 0
    })
    seed3.save()
        .then(item => {
            res.json(item)
        })
        console.log('here')
        
})


router.post('/addItem', (req, res) => {
    const { userId, itemId } = req.body;

    User.findById(userId)
        .then(user => {
            Product.findById(itemId)
                .then(product => {
                    console.log(product)
                    user.cart.push(product)
                    user.save()
                        .then(() => {
                            res.json({ cart: user.cart })
                        })
                        .catch(err => {
                            if (err) throw err
                        })

                }).catch(err => console.log(err))
        }).catch(err => console.log(err))

});


router.post('/removeItem', (req, res) => {

    const { userId, itemId } = req.body
    User.findById(userId)
        .then(user => {
            console.log(user.cart)
            user.cart.map((item, i) => {
                if (item._id == itemId) {
                    user.cart.splice(i, 1)
                }
            })
            user.save()
            res.json({ status: 200 })
        }).catch(err => console.log(err))
});



router.post('/deleteItem', (req, res) => {
    const { itemId } = req.body;
    Product.findById(itemId)
        .then(item => {
            item.remove()
            res.json({ status: 200 })
        })
        .catch(err => res.status(404).json({ success: false }))
});
module.exports = router