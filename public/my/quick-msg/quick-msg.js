(function () {
    angular.module('quickMsg', [])
    .directive('quickMsg', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                isShow: '='
            },
            link: function (scope, element, attrs) {
                element.addClass('quick-msg');
                scope.$watch('isShow', function (newVal, oldVal) {
                    if (newVal === true) {
                        element.addClass('on');
                        $timeout(function () {
                            element.removeClass('on');
                            scope.isShow = false;
                        }, 500);
                    }
                });
            }
        }
    }]);
}());