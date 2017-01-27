/**
 * Created by FabioZoz on 25/01/2017.
 */
angular.module('home', [])
    .controller('home', function($http, auth) {
        var self = this;

        self.authenticated = function() {
            return auth.authenticated;
        };

        $http.get('/resource').then(function(response) {
            self.greeting = response.data;
        })
    });