(function () {
    'use strict'

    var notify = angular.module('vinNotify', []);

    notify.service('vinNotify', ['$compile', '$timeout', '$q', function ($compile, $timeout, $q) {
        var self = this;
        self.isExcute = false;

        /* options
            size : full, xl, lg, sm, xs, inline
            title
            message
            style
            applyFn
            cancelFn
        */
        function setOptions(options, applyFn, cancelFn) {
            self.options = options || {}
            self.options.size = options.size || "inline";
            self.options.title = options.title || "Header";
            self.options.message = options.message || "";
            self.options.style = options.style;
            self.apply = function () {
                self.close().then(function () {
                    if (applyFn) applyFn();
                })
            }
            self.cancel = function () {
                self.close().then(function () {
                    if (cancelFn) cancelFn();
                });
            }
        }

        function notifyOpen(content) {
            var body = angular.element('body'),
                html = getNotifyHtml(content);

            body.append(html);
            self.notify = angular.element('#vin-notify');
            self.modal = self.notify.find('#vin-notify-modal');

            self.setSize(self.options.size);
            self.setStyle(self.options.style);

            $compile(self.notify)(self.notify.scope());
            self.notify.addClass('open');
            self.modal.addClass('open');
            self.transitionDuration = parseFloat(window.getComputedStyle(self.notify[0]).transitionDuration);
        }

        function getNotifyHtml(content) {
            var html = "<vin-notify id='vin-notify' tabindex='1'>" +
                            "<div id='vin-notify-modal'>" +
                            content +
                            "</div>" +
                        "</vin-notify>";
            return html;
        }

        self.alert = function (options, applyFn) {
            if (self.isExcute === true) return;
            self.isExcute = true;

            self.type = "alert";
            setOptions(options, applyFn);
            var content = "<section class='vin-modal-header alert-header'>" +
                                "<div class='title'>" + self.options.title + "</div>" +
                                "<span class='glyphicon glyphicon-remove x-close-btn' ng-click='onApplyClicked()'></span>" +
                            "</section>" +
                            "<section class='vin-modal-body'>" +
                                self.options.message +
                            "</section>" +
                            "<section class='vin-modal-footer'>" +
                                "<button class='btn-tag radi-3em' ng-click='onApplyClicked()' focus='true'>Close</button>" +
                            "</section>";

            notifyOpen(content);
        };

        self.confirm = function (options, applyFn, cancelFn) {
            if (self.isExcute === true) return;
            self.isExcute = true;

            self.type = "confirm";
            setOptions(options, applyFn, cancelFn);
            var content = "<section class='vin-modal-header confirm-header'>" +
                                "<div class='title'>" + self.options.title + "</div>" +
                                "<span class='glyphicon glyphicon-remove x-close-btn' ng-click='onCancelClicked()'></span>" +
                            "</section>" +
                            "<section class='vin-modal-body'>" +
                                self.options.message +
                            "</section>" +
                            "<section class='vin-modal-footer'>" +
                                "<button class='btn-tag radi-3em' ng-click='onApplyClicked()' focus='true'>Yes</button>&nbsp;" +
                                "<button class='btn-tag radi-3em' ng-click='onCancelClicked()'>No</button>" +
                            "</section>";

            notifyOpen(content);
        };

        self.error = function (options, applyFn) {
            if (self.isExcute === true) return;
            self.isExcute = true;

            self.type = "error";
            setOptions(options, applyFn);
            var content = "<section class='vin-modal-header error-header'>" +
                                "<div class='title'>" + self.options.title + "</div>" +
                                "<span class='glyphicon glyphicon-remove x-close-btn' ng-click='onApplyClicked()'></span>" +
                            "</section>" +
                            "<section class='vin-modal-body'>" +
                                self.options.message +
                            "</section>" +
                            "<section class='vin-modal-footer'>" +
                                "<button class='btn-tag radi-3em' ng-click='onApplyClicked()' focus='true'>Close</button>" +
                            "</section>";

            notifyOpen(content);
        };

        self.close = function () {
            self.notify.removeClass('open');
            self.modal.removeClass('open');

            var deferred = $q.defer();
            $timeout(function () {
                self.notify.remove();
                self.isExcute = false;
                deferred.resolve();
            }, self.transitionDuration * 1000);
            return deferred.promise;

        }

        self.setSize = function (size) {
            self.options.size = size || self.options.size;
            var isFull = self.modal.hasClass('full'),
                isXl = self.modal.hasClass('xl'),
                isLg = self.modal.hasClass('lg'),
                isSm = self.modal.hasClass('sm'),
                isXs = self.modal.hasClass('xs'),
                isInline = self.modal.hasClass('inline');

            if (isFull) self.modal.removeClass('full');
            if (isXl) self.modal.removeClass('xl');
            if (isLg) self.modal.removeClass('lg');
            if (isSm) self.modal.removeClass('sm');
            if (isXs) self.modal.removeClass('xs');
            if (isInline) self.modal.removeClass('inline');

            self.modal.addClass(self.options.size);
            if (self.options.style) {
                self.modal.removeAttr("style");
            }
        }

        self.setStyle = function (style) {
            self.options.style = style || self.options.style;
            if (self.options.style) {
                self.modal.css(style);
            }
        }



        return self;
    }]);

    notify.directive('vinNotify', ['vinNotify', function (vinNotify) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs, ctrl) {
                element.focus();

                element.off('mousedown').on('mousedown', function (e) {
                    if (e.target.id === 'vin-notify') {
                        if (vinNotify.type === 'confirm') {
                            vinNotify.cancel();
                        }
                        else {
                            vinNotify.apply();
                        }
                    }
                });

                element.off('keyup').on('keyup', function (e) {
                    if (e.keyCode === 27) {
                        if (vinNotify.type === 'confirm') {
                            vinNotify.cancel();
                        }
                        else {
                            vinNotify.apply();
                        }
                        element.off('keyup');
                        angular.element('#vin-dialog').focus();
                    }
                });

                scope.onApplyClicked = function () {
                    vinNotify.apply();
                }
                scope.onCloseClicked = function () {
                    vinNotify.close();
                }
                scope.onCancelClicked = function () {
                    vinNotify.cancel();
                }
            }
        }
    }]);
}())