(function () {
    'use strict'

    var dialog = angular.module('vinPeek', []);

    dialog.directive('vinPeek', ['$window', function ($window) {
        return {
            restrict: 'EA',
            controller: function ($scope, $element, $attrs) {
                var ctrl = this;
                ctrl.direction = $attrs.vinPeek || 'down';        // up, up-right, down, down-right, left, right
                $element.addClass('vin-peek')
                        .addClass(ctrl.direction);

                ctrl.hideAll = function () {
                    angular.element('.peek-panel').removeClass('open');
                }

                angular.element($window).on('mousedown', function (e) {
                    if (angular.element('.peek-panel.open').length > 0) {
                        var peekAction = angular.element(e.target).parents('.peek-action').first(),
                        peekPanel = angular.element(e.target).parents('.peek-panel').first(),
                        isPeekAction = e.target.className.indexOf('peek-action'),
                        isPeekPanel = e.target.className.indexOf('peek-panel');

                        if (peekAction.length < 1 && peekPanel.length < 1 && isPeekAction < 0 && isPeekPanel < 0) {
                            ctrl.hideAll();
                        }

                        e.stopImmediatePropagation();
                    }
                });
            }
        }
    }]);

    dialog.directive('peekAction', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            require: '^?vinPeek',
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) { return false; }

                ctrl.action = attrs.peekAction || 'click';
                element.addClass('peek-action');
                var panel = element.next('.peek-panel');

                if (ctrl.action === 'click') {
                    element.on('click', function () {
                        if (panel.hasClass('open') === false) {
                            var parentPanel = panel.parents('.peek-panel').first();
                            if (parentPanel.length < 1) {
                                ctrl.hideAll();

                            } else {
                                parentPanel.find('.peek-panel').removeClass('open');
                            }

                        }
                        panel.toggleClass('open');
                    });
                }
                else if (ctrl.action === 'hover') {
                    ctrl.enterPanel = false;
                    element.on({
                        mouseenter: function () {
                            if (panel.hasClass('open') === false) {
                                var parentPanel = panel.parents('.peek-panel').first();
                                if (parentPanel.length < 1) {
                                    ctrl.hideAll();

                                } else {
                                    parentPanel.find('.peek-panel').removeClass('open');
                                }

                            }
                            panel.addClass('open');
                        },
                        mouseleave: function (e) {
                            $timeout(function () {
                                if (ctrl.enterPanel === false) {
                                    panel.removeClass('open');
                                }
                            }, 0, false);
                        }
                    });
                }
            }
        }
    }]);

    dialog.directive('peekPanel', [function () {
        return {
            restrict: 'C',
            require: '^?vinPeek',
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) { return false; }
                element.addClass(ctrl.direction);

                if (ctrl.action === 'hover') {
                    element.on({
                        mouseenter: function (e) {
                            ctrl.enterPanel = true;
                        },
                        mouseleave: function () {
                            element.removeClass('open');
                            ctrl.enterPanel = false;
                        }
                    });
                }
            }
        }
    }]);

}())