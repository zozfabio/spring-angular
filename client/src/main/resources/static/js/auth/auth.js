/**
 * Created by FabioZoz on 25/01/2017.
 */
angular.module('auth', [])
    .factory('auth', function($rootScope, $http, $location) {
        var auth = {
            authenticated: false,

            loginPath: null,
            logoutPath: null,
            homePath: null,

            authenticate: function(credentials, callback) {
                var headers = credentials && credentials.username ? {'Authorization': "Basic " + btoa(credentials.username + ":" + credentials.password)} : {};

                $http.get('/user', { headers: headers }).then(function(response) {
                    if (response.data.name) {
                        auth.authenticated = true;
                    } else {
                        auth.authenticated = false;
                    }
                    $location.path(auth.path == auth.loginPath ? auth.homePath : auth.path);
                    callback && callback(auth.authenticated);
                }, function() {
                    auth.authenticated = false;
                    callback && callback(false);
                });
            },

            clear: function() {
                auth.authenticated = false;
                $location.path(auth.homePath);
                $http.post(auth.logoutPath, {});
            },

            init: function(homePath, loginPath, logoutPath) {
                auth.homePath = homePath;
                auth.loginPath = loginPath;
                auth.logoutPath = logoutPath;

                $rootScope.$on('$routeChangeStart', function() {
                    auth.path = $location.path();
                    if ($location.path() != auth.homePath && $location.path() != auth.loginPath) {
                        if (!auth.authenticated) {
                            $location.path(auth.loginPath);
                        }
                    }
                });

                auth.authenticate({}, function(authenticated) {
                    if (authenticated) {
                        $location.path(auth.path);
                    }
                });
            }
        };
        return auth;
    });