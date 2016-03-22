(function () {
    'use strict';
    angular
        .module('AngularAuthApp')
        .factory('ordersService', ['$http', function ($http) {

            var serviceBase = 'http://localhost:57897/';
            var ordersServiceFactory = {};

            ordersServiceFactory.getOrders = getOrders;

            return ordersServiceFactory;
            /////////////////////////////////////////////////

            function getOrders() {

                return $http.get(serviceBase + 'api/orders').then(function (results) {
                    return results;
                });
            }

        }]);

})()