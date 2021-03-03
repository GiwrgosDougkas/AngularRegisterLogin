

myApp.controller('RegisterController',['$scope','Authentication',function($scope,Authentication){
   

    $scope.login=function(){
        Authentication.login($scope.user);
    }

    $scope.register=function(){
        Authentication.register($scope.user);
    }
    $scope.logout=function(){
        Authentication.logout();
    }
}]);