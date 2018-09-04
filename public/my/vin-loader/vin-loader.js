(function () {
    'use strict'

    var dialog = angular.module('vinLoader', []);
    dialog.service('vinLoader', ['$compile', '$timeout', function ($compile, $timeout) {
        var self = this;
        self.isExcute = false;

        function setOptions(options) {
            self.options = options || {}
            self.options.type = self.options.type || "pot";
        }

        function loaderOn(content) {
            if (angular.element('#vin-loader').length > 0) {
                return false;
            }
            var body = angular.element('body'),
                html = "<vin-loader id='vin-loader' type=" + self.options.type + "></vin-loader>";

            body.append(html);
            self.loader = angular.element('#vin-loader');
            $compile(self.loader)(self.loader.scope());
            self.transitionDuration = parseFloat(window.getComputedStyle(self.loader[0]).transitionDuration);
        }

        self.on = function (options) {
            if (self.isExcute === true) return;
            self.isExcute = true;

            setOptions(options);
            loaderOn();
        }
        self.off = function () {
            if (!self.loader) return;

            self.loader.removeClass('on');
            $timeout(function () {
                self.loader.remove();
                self.isExcute = false;
            }, self.transitionDuration * 1000);
        }
    }])
    dialog.directive('vinLoader', [function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                element
                    .attr('id', 'vin-loader')
                    .addClass('on');

                setPath();
                attrs.$observe("type", function (type) {
                    scope.template = scope.path + "/template/" + type + ".html";
                });

                function setPath() {
                    var scripts = document.getElementsByTagName("script"),
                    src;
                    for (var i = 0; i < scripts.length; i++) {
                        src = scripts[i].getAttribute('src');
                        if (src.indexOf('vin-loader.js') >= 0) {
                            scope.path = src.substr(0, src.lastIndexOf('/'));
                            return false;
                        }
                    }
                }

            },
            template: "<span ng-include='template'></div>"
        }

    }]);
}())