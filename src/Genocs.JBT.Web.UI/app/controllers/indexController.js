(function () {
    'use strict';

    angular
        .module('AngularAuthApp')
        .controller('indexController', ['$scope', '$location', 'authService', indexController]);

    function indexController($scope, $location, authService) {
        /*jshint validthis: true */
        var vm = this;

        vm.logOut = logOut;
        vm.authentication = authService.authentication;
        vm.claims = null;

        authService.getClaims().then(function (result) {
            vm.claims = result.data;
        });

        function logOut() {
            authService.logOut();
            $location.path('/home');
        }
    }

})()