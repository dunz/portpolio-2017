(function () {
    'use strict'

    var dropzone = angular.module('vinDropzone', []);
    dropzone.directive('vinDropzone', vinDropzoneDirective);

    vinDropzoneDirective.$inject = [];
    function vinDropzoneDirective() {
        function link(scope, element, attrs) {
            element.addClass('vin-dropzone');
            //element.addClass('overed');

            element[0].addEventListener('dragover', function (event) {
                event.preventDefault();
            }, false);

            element[0].addEventListener('dragenter', function (event) {
                event.preventDefault();
                //if (event.target.className.indexOf('vin-dropzone') >= 0) {
                    element.addClass('overed');
                //}
            }, false);

            element[0].addEventListener("dragleave", function (event) {
                if (event.target.className.indexOf('dropzone-fixed') >= 0) {
                    element.removeClass('overed');
                }
            }, false);

            element[0].addEventListener("drop", function (event) {
                event.preventDefault();
                if (event.target.className.indexOf('dropzone-fixed') >= 0) {
                    element.removeClass('overed');
                    scope.uploadFn({ file: event.dataTransfer.files });
                }
            }, false);
        }

        function template() {
            var template = [
                '<section class="dropzone-full">',
                    '<ng-transclude></ng-transclude>',
                '</section>',
                '<section class="dropzone-fixed"></section>'
            ].join('');
            return template;
        }

        return {
            restrict: 'EA',
            link: link,
            template: template,
            transclude: true,
            scope: {
                uploadFn: '&',
                uploadMulti: '@',
            },
        }
    }
}())