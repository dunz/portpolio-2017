angular.module('app').controller('vinTipController', vinTipController);

vinTipController.$inject = ['$scope'];
function vinTipController($scope) {
    $scope.tipOptions = {
        message: "이것이 바로 꿀팁!",
        direction: "top"
    }
}