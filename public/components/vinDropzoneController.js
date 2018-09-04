angular.module('app').controller('vinDropzoneController', vinDropzoneController);

vinDropzoneController.$inject = ['$scope', '$timeout'];
function vinDropzoneController($scope, $timeout) {
    $scope.uploadFile = function (files) {
        $timeout(function () {
            $scope.files = files;
            console.log($scope.files);
        })
    }
}