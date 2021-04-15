angular.module('app').controller('vinDialogController', vinDialogController);

vinDialogController.$inject = ['$scope', 'vinDialog'];
function vinDialogController($scope, vinDialog) {
    $scope.openDialog = function (){
        vinDialog.open({
            // size: 'sm',
            templateUrl: '/public/components/popup.html',
            controller: 'popupController'
        }, function (result) {
            // alert('ok');
        }, function () {
            // alert('cancel');
        });
    }
}