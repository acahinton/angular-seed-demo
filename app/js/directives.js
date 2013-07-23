'use strict';

/* Directives */


var myApp = angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

myApp.directive('fleetalertdate', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            eventdate: '@'
        },
        template: "<span class=\"deliveryDate\">{{eventdate}}</span>",
        link: function (scope, element) {

            element.parent().bind("mouseenter", function () {
                element.addClass('visibleAtLast');
            });

            element.parent().bind("mouseleave", function () {
                element.removeClass('visibleAtLast');
            });
        }
    };
});
