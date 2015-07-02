'use strict';

angular.module('stable.examples.simple', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'examples.simple', {
      url: '/simple',
      views: {
        'innerView': {
            templateUrl: 'js/examples/simple/simple.html'
        }
      }
    });
}])

