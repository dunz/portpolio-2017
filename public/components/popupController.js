angular.module('app').controller('popupController', popupController);

popupController.$inject = ['$scope', 'vinDialog'];
function popupController($scope, vinDialog) {
    $scope.ok = function () {
        vinDialog.apply()
    }
    $scope.cancel = function () {
        vinDialog.close()
    }
    $scope.openDialog = function (){
        vinDialog.open({
            // size: 'sm',
            templateUrl: '/components/popup.html',
            controller: 'popupController'
        }, function (result) {
            // alert('ok');
        }, function () {
            // alert('cancel');
        });
    }
}