$(function () {
    'use strict';

    angular.module('hiddenMenu', [])
        .directive('hiddenMenu', hiddenMenu);

    hiddenMenu.$inject = [];
    function hiddenMenu() {
        return {
            restrict : 'E',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    show();
                });
                var $hiddenSmall = element.find('#hidden-small');
                var $hiddenBig = element.find('#hidden-big');
                $hiddenBig.hide();

                function show() {
                    if(!element.hasClass('on')) {
                        element.addClass('on');
                        createBackground();
                        $hiddenSmall.fadeOut(200);
                        $hiddenBig.fadeIn(200);
                    }
                }

                function hide() {
                    $('#hidden-back').removeClass('on');
                    setTimeout(function () {
                        $('#hidden-back').remove();
                    }, 400)
                    $('#hidden-back').off('click');
                
                    element.removeClass('on');
                    $hiddenSmall.fadeIn(200);
                    $hiddenBig.fadeOut(200);
                }

                function createBackground () {
                    element.before('<article id="hidden-back"></article>');
                    setTimeout(function () {
                        $('#hidden-back').addClass('on');
                    });

                    $('#hidden-back').on('click', function () {
                        hide();
                    });
                }
            }
        }
    }
}())