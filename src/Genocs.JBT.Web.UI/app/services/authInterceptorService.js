(function () {
    'use strict';
    angular
        .module('AngularAuthApp')
        .factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {

            var authInterceptorServiceFactory = {};

            authInterceptorServiceFactory.request = request;
            authInterceptorServiceFactory.responseError = responseError;

            return authInterceptorServiceFactory;
            /////////////////////////////////////////////////

            function request(config) {

                config.headers = config.headers || {};

                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.token;
                }

                return config;
            }

            function responseError(rejection) {
                if (rejection.status === 401) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }

        }]);
})()