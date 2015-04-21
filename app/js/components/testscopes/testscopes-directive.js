'use strict';

angular.module('myApp.testscopes.tsdirective', [])

.directive('testScopeDir', [function() {
  return {
    template: '<button ng-click="onButtonClicked()" >Test Button</button>',
    compile: function(){
      console.log("compile: ", arguments);

      return {
        preLink: function(scope, element, attrs){
          console.log("preLink: ", arguments);
        },
        postLink: function(scope, element, attrs){
          console.log("postLink: ", arguments);
        }
      }

    }
  }
}]);
