(function () {
    'use strict'

    var dialog = angular.module('vinTip', []);
    /*
    attrs : 
        - vin-tip 값이 할당되면 tip-message, tip-direction 값은 무시됨 ( vin-tip의 message, direction 프로퍼티값을 따라감 )
    {
        1) vin-tip : object           // 컨트롤러에서 object 정의
            message,
            direction
    } 

    OR

    {
        2) tip-message
        3) tip-direction
            - moved position
                top
                bottom
                left
                top

            - fixed position
                up
                up-center
                up-right
                down
                down-center
                down-right
    }
    */
    dialog.directive('vinTip', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            scope : {
                vinTip:'='
            },
            controller: function ($scope, $element, $attrs) {
                var ctrl = this,
                    fixedPosition = ['up', 'up-center', 'up-right', 'down', 'down-center', 'down-right'],
                    movedPosition = ['top', 'bottom', 'left', 'right'];

                settingElement();
                setContent();
                makeTip();

                function settingElement() {
                    $element.addClass('vin-tip');

                    if (window.getComputedStyle) {
                        var compStyle = window.getComputedStyle($element[0]);
                        if (compStyle.display === 'inline') {
                            $element.css('display', 'inline-block');
                        }

                    } else if ($element.context.currentStyle.display === 'inline') {
                        $element.css('display', 'inline-block');
                    }
                }

                function setContent() {
                    if ($scope.vinTip) {
                        ctrl.message = $scope.vinTip.message;
                        ctrl.direction = $scope.vinTip.direction || 'top';
                    }
                    else {
                        ctrl.message = $attrs.tipMessage;
                        ctrl.direction = $attrs.tipDirection || 'top';
                    }
                }

                function makeTip() {
                    var html = "<tip-box class='tip-box'>" + ctrl.message + "<span class='tri " + ctrl.direction + "'></span></tip-box>";
                    $element.append(html);
                    ctrl.tipBox = $element.find(".tip-box");
                    ctrl.tipBoxWidth = parseInt(ctrl.tipBox.css('width'));
                    ctrl.tipBoxHeight = parseInt(ctrl.tipBox.css('height'));
                    $compile(ctrl.tipBox)(ctrl.tipBox.scope());
                }
                
                $element.on({
                    mouseenter: function (e) {
                        ctrl.tipBox.addClass('open');
                        if ($.inArray(ctrl.direction, fixedPosition) >= 0) {
                            setFixedPosition(e);
                        }
                    },
                    mousemove: function (e) {
                        if (e.target.className.indexOf('vin-tip') < 0) {
                            return false;
                        }
                        if ($.inArray(ctrl.direction, movedPosition) >= 0) {
                            setMovedPosition(e);
                        }
                    },
                    mouseleave: function () {
                        ctrl.tipBox.removeClass('open');
                    }
                });

                function setFixedPosition() {
                    var harfWidth = ctrl.tipBoxWidth / 2,
                        cssSetting;

                    switch (ctrl.direction) {
                        case 'up':
                            cssSetting = {
                                left: 0,
                                bottom: '100%',
                                marginBottom: 10
                            }
                            break;

                        case 'down':
                            cssSetting = {
                                left: 0,
                                top: '100%',
                                marginTop: 10
                            }
                            break;

                        case 'up-right':
                            cssSetting = {
                                right: 0,
                                bottom: '100%',
                                marginBottom: 10
                            }
                            break;

                        case 'down-right':
                            cssSetting = {
                                right: 0,
                                top: '100%',
                                marginTop: 10
                            }
                            break;

                        case 'up-center':
                            cssSetting = {
                                //left: (parseInt($element.css('width')) / 2) - harfWidth,
                                left: '50%',
                                marginLeft: -harfWidth,
                                bottom: '100%',
                                marginBottom: 10
                            }
                            break;

                        case 'down-center':
                            cssSetting = {
                                //left: (parseInt($element.css('width')) / 2) - harfWidth,
                                left: '50%',
                                marginLeft: -harfWidth,
                                top: '100%',
                                marginTop: 10
                            }
                            break;

                        default:
                            break;
                    }

                    ctrl.tipBox.css(cssSetting);
                }

                function setMovedPosition(event) {
                    var harfWidth = ctrl.tipBoxWidth / 2,
                        harfHeight = ctrl.tipBoxHeight / 2,
                        cssSetting;

                    
                    switch (ctrl.direction) {
                        case 'top':
                            cssSetting = {
                                left: event.offsetX - harfWidth,
                                top: event.offsetY - ctrl.tipBoxHeight - 20
                            }
                            break;

                        case 'bottom':
                            cssSetting = {
                                left: event.offsetX - harfWidth,
                                top: event.offsetY + 35
                            }
                            break;

                        case 'left':
                            cssSetting = {
                                left: event.offsetX - ctrl.tipBoxWidth - 30,
                                top: event.offsetY - harfHeight
                            }
                            break;

                        case 'right':
                            cssSetting = {
                                left: event.offsetX + 30,
                                top: event.offsetY - harfHeight
                            }
                            break;

                        default:
                            break;
                    }

                    ctrl.tipBox.css(cssSetting);
                }
            }
        }
    }]);

}())