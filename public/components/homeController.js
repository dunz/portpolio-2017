angular.module('app').controller('homeController', homeController);

homeController.$inject = ['$scope'];
function homeController($scope) {
    document.getElementById('main-video').volume = 0.01;
}