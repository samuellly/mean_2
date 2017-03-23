myApp.controller('dashboardController', ['$scope', 'storeFactory', '$location', '$routeParams', function ($scope, storeFactory, $location, $routeParams){

  storeFactory.getOrders(function (data){
      $scope.orders = data.data;
  })
  storeFactory.getProducts(function (data){
      $scope.products = data.data;
  })
  storeFactory.getCustomers(function (data){
      $scope.customers = data.data;
  })



}])
