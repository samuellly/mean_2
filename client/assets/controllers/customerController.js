myApp.controller('customerController', ['$scope', 'storeFactory', '$location', '$routeParams', function ($scope, storeFactory, $location, $routeParams){

  $scope.check = 0;
  $scope.$watch('check', function(newValue, oldValue) {
     storeFactory.getCustomers(function(data){
      $scope.customers = data.data
    })
  })
  $scope.remove = function(id) {
    storeFactory.removeCustomer(id, function(data) {
      console.log(data)
      $scope.check = data;
    });
  }

  $scope.addCustomer = function() {
    $scope.DNError = true
    $scope.ACError = true
    storeFactory.addCustomer($scope.customer, function(data) {
      $scope.check = data;
      if(data.data.errmsg) {
                $scope.DNError = false
                $scope.duplicateNameError = "Customer already exists"
              }
      if(data.data.errors.name) {
                $scope.ACError = false
                $scope.customerError = data.data.errors.name.message
              }
    });
  }

}])
