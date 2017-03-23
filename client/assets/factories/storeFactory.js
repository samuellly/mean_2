myApp.factory('storeFactory', ['$filter', '$http', '$location', function($filter, $http, $location) {

    var factory = {};
    var customers;
    factory.addCustomer = function(newCustomer, callback) {
        $http.post('/customer', newCustomer).then(function(data) {
            console.log("got customers")
            console.log(data)
            if (data.data.errors || data.data.errmsg || data.data.name) {
                callback(data);
            }
        })
    }
    factory.getCustomers = function(callback) {
        $http.get('/getCustomers').then(function(data) {
            console.log('got customers')
            callback(data);
        })
    }
    factory.removeCustomer = function(id, callback) {
        $http.delete('/customer/' + id).then(function(data) {
            console.log("success removing customer")
            callback(data);
        })
    }

    factory.getCustomers = function(callback) {
        $http.get('/getCustomers').then(function(data) {
            console.log('got customers')
            callback(data);
        })
    }
    factory.addProduct = function(newProduct, callback) {
        console.log(newProduct)
        $http.post('/product', newProduct).then(function(data) {
            console.log("got products")
            console.log(data)
            if (data.data.errors || data.data.errmsg || data.data.name) {
                callback(data);
            }
        })
    }
    factory.getProducts = function(callback) {
        $http.get('/getProducts').then(function(data) {
            console.log('got products')
            callback(data);
        })
    }
    factory.removeProduct = function(id, callback) {
        $http.delete('/product/' + id).then(function(data) {
            console.log("success removing product")
            callback(data);
        })
    }
    factory.addOrder = function(newOrder, callback) {
        console.log(newOrder)
        $http.post('/order', newOrder).then(function(data) {
            console.log("created orders")
                callback(data);
        })
    }
    factory.getOrders = function(callback) {
        $http.get('/getOrders').then(function(data) {
            console.log('got orders')
            callback(data);
        })
    }
    factory.removeOrder = function(id, callback) {
      $http.delete('/order/' + id).then(function(data){
        console.log("success removing order")
        callback(data);
      })
    }

    return factory;
}]);
