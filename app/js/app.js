'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.bootstrap',
  'ui.router',
  'simpletable',
  'stable.examples.core',
  'stable.examples.main',
  'stable.examples.simple',
  'stable.examples.heavyrows',
  'stable.examples.heavytpl',
  'stable.examples.rowtpl',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/examples");
}]);
