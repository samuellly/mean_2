myApp.controller('productController', ['$scope', 'storeFactory', '$location', '$routeParams', '$http', 'Upload', function ($scope, storeFactory, $location, $routeParams, $http, Upload){


  $scope.check;
  $scope.$watch('check', function(newValue, oldValue) {
     storeFactory.getProducts(function(data){
      $scope.products = data.data
    })
  })
  $scope.remove = function(id) {
    storeFactory.removeProduct(id, function(data) {
      $scope.check = data;
    });
  }

  $scope.addProduct = function() {
    $scope.DNError = true
    $scope.APError = true
    $scope.ADError = true
    $scope.QError = true
    storeFactory.addProduct($scope.product, function(data) {
      $scope.check = data;
      if(data.data.errmsg) {
                $scope.DNError = false
                $scope.duplicateNameError = "Product already exists"
              }
      if(data.data.errors.name) {
                $scope.APError = false
                $scope.productError = data.data.errors.name.message
              }
      if(data.data.errors.description) {
                $scope.ADError = false
                $scope.descriptionError = data.data.errors.description.message
              }
      if(data.data.errors.quantity) {
                $scope.QError = false
                $scope.quantityError = data.data.errors.quantity.message
              }
    });
  }

}])
