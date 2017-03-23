var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var store = require('../controllers/controls.js');

module.exports = function(app) {
app.post('/customer',function(req, res){
  store.createCustomer(req, res)
});

app.get('/getCustomers', function(req, res) {
  store.getCustomers(req, res)
})

app.delete('/customer/:id',function(req, res){
	store.removeCustomer(req,res)
});

app.post('/product',function(req, res){
  store.createProduct(req, res)
});

app.get('/getProducts', function(req, res) {
  store.getProducts(req, res)
})

app.delete('/product/:id',function(req, res){
	store.removeProduct(req,res)
});

app.post('/order',function(req, res){
  store.createOrder(req, res)
});

app.get('/getOrders', function(req, res) {
  store.getOrders(req, res)
})

app.delete('/order/:id',function(req, res){
	store.removeOrder(req,res)
});

}
