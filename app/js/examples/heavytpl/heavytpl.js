'use strict';

angular.module('stable.examples.heavytpl', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'examples.heavytpl', {
      url: '/heavytpl',
      views: {
        'innerView': {
            templateUrl: 'js/examples/heavytpl/heavytpl.html'
        }
      }
    });
}])

