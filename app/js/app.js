'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.bootstrap',
  'ui.router',
  'simpletable',
  'stable.examples.main',
  'stable.examples.simple',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/examples");
}]);
