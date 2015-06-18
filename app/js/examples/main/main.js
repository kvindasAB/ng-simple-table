'use strict';

angular.module('stable.examples.main', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'examples', {
      url: '/examples',
      templateUrl: 'js/examples/main/main.html'
    });
}])

