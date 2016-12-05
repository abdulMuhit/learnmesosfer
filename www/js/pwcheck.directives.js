/* Directives */
angular.module('myApp.directives', [])
    .directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elm.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    // console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elm.val() === $(firstPassword).val());
                });
            });
        }
    }
}]);