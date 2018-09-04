angular.module('app').controller('vinLoaderController', vinLoaderController);

vinLoaderController.$inject = ['$scope', 'vinLoader'];
function vinLoaderController($scope, vinLoader) {
    $scope.exeLoader = function () {
        vinLoader.on();
        setTimeout(function (){
            vinLoader.off();
        }, 1000);
    }
}