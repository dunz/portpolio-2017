angular.module('app').controller('indexController', indexController)

indexController.$index = ['$scope'];
function indexController($scope){
    $scope.isOpenProfileaside = false;
}