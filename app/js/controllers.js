'use strict';

/* Controllers */

var myApp = angular.module('myApp.controllers', []).
    controller('MyCtrl1', ['$scope', function($scope) {
        $scope.message = "From a controller";
    }]);

myApp.factory('FleetAlertsSource', function($http) {
    return {
        GetTopAlerts: function () {
            return $http.get('http://api.flightgloballocal.rbidev.ds/v1/Fleet/Alerts?apiToken=00000000-0000-0000-0000-000000000001&skip=0&take=10');
        }
    };
});

myApp.controller('FDAController', ['$scope', '$timeout', 'FleetAlertsSource', function ($scope, $timeout, alertsSource) {

    $scope.filterEvents = function(filterText) {
        $scope.searchTerms = { Type: filterText };
    };

    (function tick() {
        alertsSource.GetTopAlerts().success(function (data) {
            if (data.Events.length > 1) {
                $scope.FDAs = data.Events;
            }

            $timeout(tick, 30000);
        });
    })();
}]);
 