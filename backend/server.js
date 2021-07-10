const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');
let Order= require('./models/order')

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

//Login
userRoutes.route('/login').post(function(req, res) {
    let user = req.body;
    // console.log(user);
    User.find({username: `${user.username}`, password: `${user.password}` }, function(err, users) {
        return res.json(users);
    });
});


// Adding a new Product
userRoutes.route('/vendor/add').post(function(req, res) {
    let product = new Product(req.body);
    console.log(req.body)
    product.save()
        .then(user => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Getting all the products
userRoutes.route('/vendor/product').post(function(req, res) {
    let product=req.body
    // console.log("prod")
    // console.log(req.body)
    Product.find({username: `${product.username}`, status: `${product.status}` , quantity: {$ne: `${product.quantity}` } },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Getting all the products ready to dispatch
userRoutes.route('/vendor/dispatch').post(function(req, res) {
    let product=req.body
    console.log("prod")
    console.log(req.body)
    Product.find({username: `${product.username}`, status: `${product.status}` , quantity: `${product.quantity}` },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Getting all the products dispatched
userRoutes.route('/vendor/dispatched').post(function(req, res) {
    let product=req.body
    console.log("prod")
    console.log(req.body)
    Order.find({username_vendor: `${product.username}`, status: `${product.status}` , quantity_remaining: `${product.quantity}` },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Cancelling product
userRoutes.route('/vendor/product_cancel').post(function(req, res) {
    let product=req.body
    // console.log("prod")
    // console.log(req.body)
    Product.updateOne({username: `${product.username}`, status: `${product.status}` , quantity: {$ne: `${product.quantity}` } , name: `${product.name}` ,_id: `${product.id}` }, { $set: {status: "Cancelled"} } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log(products);
        }
    });

    Order.updateMany({product_id: `${product.id}` }, { $set: {status: "Cancelled"} } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });

});

// disatching product
userRoutes.route('/vendor/dispatch_disp').post(function(req, res) {
    let product=req.body
    // console.log("prod")
    // console.log(req.body)
    Product.updateOne({username: `${product.username}`, status: `${product.status}` , quantity: `${product.quantity}` , name: `${product.name}`, _id: `${product.id}` }, { $set: {status: "Dispatched"} } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log(products);
        }
    });

    Order.updateMany({product_id: `${product.id}` }, { $set: {status: "Dispatched"} } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });


});


// Searching Products
userRoutes.route('/customer/search').post(function(req, res) {
    let product=req.body
    // console.log("prod")
    // console.log(req.body)
    Product.find({ name: `${product.name}`, quantity: {$ne: `${product.qty}` } },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});


// Ordering
userRoutes.route('/customer/order/1').post(function(req, res) 
{
    let order = req.body;
    console.log("1")
    Product.updateOne({_id: `${order.product_id}` }, { $inc: { quantity: -`${order.quantity}` } },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });

});

userRoutes.route('/customer/order/2').post(function(req, res) 
{
    console.log("2")
    let order = req.body;
    Product.updateMany({quantity: 0,status:"Not Dispatched"},{$set: {status: "Ready to Dispatch" }},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

userRoutes.route('/customer/order/3').post(function(req, res) 
{
    console.log("3")
    let order2 = new Order(req.body);
    console.log(req.body)
    order2.save()
        .then(user => {
            res.status(200).json({'Order': 'Order added successfully'});
            //console.log("Order")
        })
        .catch(err => {
            res.status(400).send('Error');
            //console.log("err")
        });
});

userRoutes.route('/customer/order/4').post(function(req, res) 
{   
    console.log("4")
    let order3 = req.body;

    Order.updateMany({product_id: `${order3.product_id}` }, { $inc: { quantity_remaining: -`${order3.quantity}` } },function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

userRoutes.route('/customer/order/5').post(function(req, res) 
{
    console.log("5")
    let order = req.body;
    Order.updateMany({quantity_remaining: 0, status:"Not Dispatched"} , {$set: {status: "Ready to Dispatch" }},function(err, products) {
        if (err) {
            console.log(err);
        } else {
           res.json(products);
          // console.log(products)
        }
    });

});



// Getting all the orders_customer
userRoutes.route('/customer/list').post(function(req, res) {
    let order=req.body
    // console.log("prod")
    // console.log(req.body)
    Order.find({username_customer: `${order.username_customer}`},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});



// Editing
userRoutes.route('/customer/edit').post(function(req, res) {
    let product=req.body
    Product.updateOne({_id: `${product.product_id}` }, { $inc: {quantity: -`${product.qty}` } } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log(products);
        }
    });

    Order.updateOne({_id: `${product.order_id}` }, { $inc: {quantity: `${product.qty}`, quantity_remaining: -`${product.qty}` } } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });

});


//Rating the Vendor
userRoutes.route('/customer/rate').post(function(req, res) {
    let product=req.body
    User.updateOne({username: `${product.vendor_username}`}, { $inc: {rating: `${product.rating}` } } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log(products);
        }
    });

    User.updateOne({username: `${product.vendor_username}`}, { $mul: {rating: 0.5 } } ,function(err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log(products);
        }
    });

});
// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
