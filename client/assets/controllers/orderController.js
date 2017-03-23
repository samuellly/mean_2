myApp.controller('orderController', ['$scope', 'storeFactory', '$location', '$routeParams', function ($scope, storeFactory, $location, $routeParams){

  $scope.check;
  $scope.$watch('check', function(newValue, oldValue) {
     storeFactory.getOrders(function(data){
      $scope.orders = data.data
    })
  })
  storeFactory.getProducts(function (data){
      $scope.products = data.data;
  })
  storeFactory.getCustomers(function (data){
      $scope.customers = data.data;
  })

  $scope.remove = function(id) {
    storeFactory.removeOrder(id, function(data) {
      $scope.check = data;
    });
  }

  $scope.addOrder = function() {
    $scope.SQError = true
    storeFactory.addOrder($scope.order, function(data) {
      $scope.check = data;
      if(data.data.amountErr) {
        $scope.SQError = false;
        $scope.sufficientQuantityError = data.data.amountErr
      }
    })
  }
}])
