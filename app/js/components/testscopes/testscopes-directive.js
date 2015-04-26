'use strict';

angular.module('myApp.testscopes.tsdirective', [])

.directive('testScopeDir', [function() {
  return {
    scope: true,
    template: '<button ng-click="onButtonClicked()" >Test Button</button>',
    compile: function(tElement, tAttrs, transclude){
      console.log("compile: ", tElement, tAttrs, transclude);

      return {
        pre: function(scope, iElement, iAttrs, controller){
          console.log("preLink: ", scope, iElement, iAttrs, controller);
          console.log(scope);
        },
        post: function(scope, iElement, iAttrs, controller){
          console.log("postLink: ", scope, iElement, iAttrs, controller);
        }
      }

    }
  }
}]);
