(function () {
    'use strict';
    angular
        .module('AngularAuthApp')
        .factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

            var serviceBase = 'http://localhost:57897/';
            var _authentication = {
                isAuth: false,
                userName: ""
            };

            var authServiceFactory = {};

            authServiceFactory.saveRegistration = saveRegistration;
            authServiceFactory.login = login;
            authServiceFactory.logOut = logOut;
            authServiceFactory.fillAuthData = fillAuthData;
            authServiceFactory.authentication = _authentication;
            authServiceFactory.getClaims = getClaims;

            return authServiceFactory;
            /////////////////////////////////////////////////

            function saveRegistration(registration) {

                logOut();

                return $http.post(serviceBase + 'api/accounts/create', registration).then(function (response) {
                    return response;
                });

            }

            function login(loginData) {

                var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

                var deferred = $q.defer();

                $http.post(serviceBase + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;

                    deferred.resolve(response);

                }).error(function (err, status) {
                    logOut();
                    deferred.reject(err);
                });

                return deferred.promise;

            }

            function logOut() {

                localStorageService.remove('authorizationData');

                _authentication.isAuth = false;
                _authentication.userName = "";

            }

            function fillAuthData() {

                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    _authentication.isAuth = true;
                    _authentication.userName = authData.userName;
                }

            }

            function getClaims() {

                var deferred = $q.defer();

                if (_authentication.isAuth) {

                    return $http.get(serviceBase + 'api/claims').success(function (response) {

                        deferred.resolve(response);

                    }).error(function (err, status) {

                        deferred.reject(err);

                    });
                }

                return deferred.promise;

            }

        }]);

})()