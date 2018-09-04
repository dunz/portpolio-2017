angular.module('app').controller('quickMsgController', quickMsgController);

quickMsgController.$inject = ['$scope'];
function quickMsgController($scope) {
   $scope.a = 'a'
}