'use strict';

/* Controllers */

var myApp = angular.module('myApp.controllers', []).
    controller('MyCtrl1', ['$scope', function($scope) {
        $scope.message = "From a controller";
    }]);

myApp.directive('fleetalertdate', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            eventdate: '@'
        },
        template: "<span class=\"deliveryDate\">{{eventdate}}</span>",
        link: function(scope, element) {

            element.parent().bind("mouseenter", function () {
                element.addClass('visibleAtLast');
            });

            element.parent().bind("mouseleave", function () {
                element.removeClass('visibleAtLast');
            });
        }
    };
});

myApp.controller('FDAController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    $scope.filterEvents = function(filterText) {
        $scope.searchTerms = { Type: filterText };
    };

    var latestDate = '2005-11-09T00:00:00';
    var GetStuff = function(http) {
        return http.get('http://api.flightgloballocal.rbidev.ds/v1/Fleet/Alerts?apiToken=00000000-0000-0000-0000-000000000001&skip=0&take=10&earliestDate=' + latestDate);
    };


    (function tick() {
        GetStuff($http).success(function(data) {
            console.log(data);
            if (data.Events.length > 1) {
                $scope.FDAs = data.Events;
                latestDate = data.Events[0].EventDate;
            }

            $timeout(tick, 30000);
        });
    })();
}]);
 