(function () {
    'use strict'

    var dialog = angular.module('vinActiveButton', []);

    dialog.directive('vinActiveButton', ['$compile', '$http', '$timeout', function ($compile, $http, $timeout) {
        return {
            restrict: 'E',
            scope: {
                isOpen: '='
            },
            link: function (scope, element, attrs) {
                var type = 0,
                    currentClass = '';

                element.addClass('vin-active-button')
                .append('<div/>').append('<div/>').append('<div/>');

                changeClass();

                element.on('click', function () {
                    if (angular.isDefined(scope.isOpen)) {
                        type = scope.isOpen ? 2 : 1;
                    } else {
                        type++;
                    }
                    changeClass();
                });

                function changeClass() {
                    if (type > 1) {
                        type = 0;
                    }
                    switch (type) {
                        case 0:
                            element.removeClass(currentClass);
                            currentClass = '';
                            break;
                        case 1:
                            element.removeClass(currentClass);
                            element.addClass('cross');
                            currentClass = 'cross';
                            break;
                        case 2:
                            element.removeClass(currentClass);
                            element.addClass('arrow');
                            currentClass = 'arrow';
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }]);
    //dialog.service('vinDialog', ['$compile', '$http', '$timeout', function ($compile, $http, $timeout) {
        
    //}]);

}())