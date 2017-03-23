var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');

module.exports = {
	createCustomer: function(req, res){
      console.log(req.body)
      var customer = new Customer(req.body);
      customer.save(function(err, context) {
	    if(err) {
	      console.log('Error with registering new customer');
        console.log(err)
        return res.json(err)
	    } else {
	      console.log('successfully registered a new customer!');
        console.log(context)
        return res.json(context)
	    }
	})
    },
   getCustomers: function (req, res) {
    Customer.find({}, null, {sort: 'created_at'}).exec( function(err, context) {
      if(context[0]) {
        console.log('success getting customers')
        return res.json(context)
      }
      else {
        console.log('no Customers yet')
        return res.json(context)
      }
    })
  },
  removeCustomer: function(req, res){
      Customer.remove({_id: req.params.id}, function(err, customer) {
        if(err) {
          console.log('something went wrong THERE');
        } else {
          console.log('successfully removed a customer!');
          console.log(customer)
          return res.json(customer)
        }
      })
    },
  createProduct: function(req, res){
    var product = new Product(req.body);
    product.save(function(err, context) {
    if(err) {
      console.log('Error with registering new product');
      console.log(err)
      return res.json(err)
    } else {
      console.log('successfully registered a new product!');
      console.log(context)
      return res.json(context)
    }
  })
  },
  getProducts: function (req, res) {
    Product.find({}, null, {sort: 'created_at'}).exec( function(err, context) {
      if(context[0]) {
        console.log('success getting products')
        return res.json(context)
      }
      else {
        console.log('no Products yet')
        return res.json(context)
      }
    })
  },
  removeProduct: function(req, res){
      Product.remove({_id: req.params.id}, function(err, product) {
        if(err) {
          console.log('something went wrong THERE');
        } else {
          console.log('successfully removed a product!');
          return res.json(product)
        }
      })
    },
  createOrder: function(req, res){
    Customer.findOne({name: req.body.customer}, function(err, customer) {
      Product.findOne({name: req.body.product}, function(err, product) {
        var order = new Order({ quantity: req.body.quantity});
        order._customer = customer._id;
        order._product = product._id;
    if(product.sufficientQuantity(req.body.quantity)) {
        order.save(function(err){
            if(err) {
              console.log(err)
              console.log("order not saved")
            } else {
              console.log("order saved")
              customer.orders.push(order);
              console.log(product)
              customer.save(function(err){
                   if(err) {
                        console.log('Error with saving customer with order');
                   } else {
                        console.log("Customer Saved with order")
                   }
              })
              product.save(function(err){
                   if(err) {
                        console.log('Error with saving product with order');
                   } else {
                        console.log("Product saved with order")
                       return res.json(order)
                   }
              })
          }
      })
    } else {return res.json({amountErr: 'Insufficient Quantity Left'})}
    })
  })
  },
  getOrders: function (req, res) {
    Order.find({}, null, {sort: 'created_at'}).populate('_customer _product').exec( function(err, context) {
      if(context[0]) {
        console.log('success getting products')
        return res.json(context)
      }
      else {
        console.log('no Products yet')
        return res.json(context)
      }
    })
  },
  removeOrder: function(req, res){
      Order.remove({_id: req.params.id}, function(err, order) {
        if(err) {
          console.log('something went wrong THERE');
        } else {
          console.log('successfully removed a order!');
          return res.json(order)
        }
      })
    }
};
