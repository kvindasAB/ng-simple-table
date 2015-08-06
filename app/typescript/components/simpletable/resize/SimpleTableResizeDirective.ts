/// <reference path="SimpleTableResize.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
angular.module('simpletable.resizable', [])
    .directive('stTableResizable', ['$timeout', '$window',
        function($timeout, $window){
        return {
            require: '^stTable',
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                if(!$scope.simpleTableResize){
                    $scope.simpleTableResize = new SimpleTableResize.SimpleTableResize($scope, $element, $attrs, $window);
                }
                // Controller referenced as this in ang 1.3
                this.getParent = function(){
                    return $scope.simpleTableResize;
                }
                return $scope.simpleTableResize;
            },
            link: function($scope, $element, $attrs, parent) {
                if(!$scope.simpleTableResize){
                    $scope.simpleTableResize = new SimpleTableResize.SimpleTableResize($scope, $element, $attrs, $window);
                }
                $scope.simpleTableResize.parent = parent;
                $scope.simpleTableResize.init();
                return $scope.simpleTableResize;
            }
        };
    }])
    .directive('stTableResizableHandler', ['$timeout', function($timeout){
        return {
            require: '?^stTableResizable',
            restrict: 'A',
            link: function (scope, element, attrs, parentCtrl) {
                if(!parentCtrl){return;}
                element.on('mousedown', function(event){parentCtrl.getParent().onMouseDownHandler(event, scope, element);});
            }
        };
    }]);