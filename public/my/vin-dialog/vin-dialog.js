(function () {
    'use strict'

    angular.module('vinDialog', [])
        .service('vinDialog', vinDialogService)
        .directive('vinDialog', ['vinDialog', vinDialogDirective]);

    vinDialogService.$inject = ['$compile', '$http', '$timeout', '$q'];
    function vinDialogService($compile, $http, $timeout, $q) {
        var _currents = [], _current = null, isExecute = false;
        
        // Dialog 생성자
        function dialog(options, applyFn, closeFn) {
            this.options = options;
            this.options.size = options.size || "inline";
            this.applyFn = applyFn || null;
            this.closeFn = closeFn || null;
            this.transitionDuration = 0;
            this.params = this.options.params || {};

            var self = this;
            this.getTemplate(this).then(function (content) {
                self.open(content);
            });
        }
        
        dialog.prototype.getTemplate = function () {
            var deferred = $q.defer();

            $http.get(this.options.templateUrl).then(function (response) {
                deferred.resolve(response.data);
                isExecute = false;
            }, function (error) {
                console.error(error);
                deferred.reject();
                isExecute = false;
            });
            return deferred.promise;
        }

        dialog.prototype.open = function (content) {
            this.setDialogID();

            angular.element('body').append(this.getDialogHtml(content));

            this.dialog = angular.element('#' + this.dialogID);
            this.modal = this.dialog.find('.vin-dialog-modal');

            this.setSize();
            this.setStyle();

            $compile(this.dialog)(this.dialog.scope());
            this.dialog.addClass('open');
            this.modal.addClass('open');
            this.transitionDuration = parseFloat(window.getComputedStyle(this.dialog[0]).transitionDuration);
            $('body').css('overflow', 'hidden');
        }

        dialog.prototype.setDialogID = function () {
            this.dialogID = 'dialog' + Math.random().toString().substr(2);
        }

        dialog.prototype.getDialogHtml = function (content) {
            var html = [
                '<vin-dialog id="', this.dialogID, '" class="vin-dialog"  ng-controller="', this.options.controller, '">'
                , '<section class="vin-dialog-mask" tabindex="1">'
                , '<div class="vin-dialog-modal">', content, '</div>'
                , '</section>'
                , '</vin-dialog>'
            ].join('');
            return html;
        }

        dialog.prototype.setSize = function () {
            var isFull = this.modal.hasClass('full'),
                isXl = this.modal.hasClass('xl'),
                isLg = this.modal.hasClass('lg'),
                isMd = this.modal.hasClass('md'),
                isSm = this.modal.hasClass('sm'),
                isXs = this.modal.hasClass('xs'),
                isInline = this.modal.hasClass('inline');

            if (isFull) this.modal.removeClass('full');
            if (isXl) this.modal.removeClass('xl');
            if (isLg) this.modal.removeClass('lg');
            if (isMd) this.modal.removeClass('md');
            if (isSm) this.modal.removeClass('sm');
            if (isXs) this.modal.removeClass('xs');
            if (isInline) this.modal.removeClass('inline');

            this.modal.addClass(this.options.size);
            if (this.options.style) {
                this.modal.removeAttr("style");
            }
        }

        dialog.prototype.setStyle = function () {
            if (this.options.style) {
                this.modal.css(this.options.style);
            }
        }

        dialog.prototype.removeDialog = function () {
            var deferred = $q.defer();
            var self = this;
            this.dialog.removeClass('open');
            this.modal.removeClass('open');

            $timeout(function () {
                self.dialog.remove();
                deleteCurrents();
                setCurrent();
                _current.dialog && _current.dialog.focus();
                deferred.resolve();
            }, this.transitionDuration * 1000);

            return deferred.promise;
        }

        dialog.prototype.apply = function (result) {
            if (isExecute === true) return;
            isExecute = true;

            var self = this;
            this.removeDialog().then(function () {
                self.applyFn && self.applyFn(result);
                isExecute = false;
                $('body').css('overflow', 'auto');
            });
        }
        
        dialog.prototype.close = function (result) {
            if (isExecute === true) return;
            isExecute = true;

            var self = this;
            this.result = result || this.result;
            this.removeDialog().then(function () {
                self.closeFn && self.closeFn(self.result);
                isExecute = false;
                $('body').css('overflow', 'auto');
                $('.vin-dialog-mask').focus();
            });
        }

        // 열려있는 모든 dialog 인스턴스 집합 생성
        function setCurrents(instance) {
            _currents.push(instance);
        }
        // 닫힌 최상위 dialog 인스턴스 제거
        function deleteCurrents() {
            _currents.splice(_currents.length - 1, 1);
        }
        // 열려있는 최상위 dialog 인스턴스 설정
        function setCurrent() {
            _current = _currents[_currents.length - 1] || {};
        }

        // singleton 서비스 객체
        return {
            open: function (options, applyFn, closeFn) {
                if (isExecute === true) return;
                if (!options.templateUrl) return;
                if (!options.controller) return;
                isExecute = true;

                var instance = new dialog(options, applyFn, closeFn);
                setCurrents(instance);
                setCurrent();
                return instance;
            },
            apply: function (result) {
                _current.apply(result);
            },
            close: function (result) {
                _current.close(result);
            },
            setCloseResult: function (result) {
                _current.result = result;
            },
            params: function () {
                return _current.params;
            },
            dialogID: function () {
                return _current.dialogID;
            },
            current: function () {
                return _current;
            }
        }
    };

    vinDialogDirective.$inject = ['vinDialog']
    function vinDialogDirective(vinDialog) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs, ctrl) {
                var mask = element.find('> .vin-dialog-mask');
                mask.focus();

                mask.on({
                    mousedown: function (e) {
                        if (e.target.parentNode.id === vinDialog.dialogID())
                            scope.hideExcute = true;
                    },
                    mouseup: function () {
                        if (scope.hideExcute === true)
                            vinDialog.close();
                    },
                    keyup: function (e) {
                        if (e.keyCode === 27)
                            vinDialog.close();
                    }
                });
            }
        }
    };

}())