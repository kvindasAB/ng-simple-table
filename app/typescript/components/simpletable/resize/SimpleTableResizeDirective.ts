/// <reference path="SimpleTableResize.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
'use strict';
angular.module('simpletable.resizable', [])
    .directive('stTableResizable', ['$timeout', '$window', 'SimpleTablePluginFactory',
        function($timeout, $window, SimpleTablePluginFactory){
        return {
            require: '^stTable',
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                if(!$scope.simpleTableResize){
                    $scope.simpleTableResize = new SimpleTableResize.SimpleTableResize($scope, $element, $attrs, $window);
                }
                return $scope.simpleTableResize;
            },
            link: function($scope, $element, $attrs, parent) {
                //$element.on('mousemove', function(event){$scope.simpleTableResize.onMouseMoveHandler(event, $scope, $element);});
                //$element.on('mouseup', function(event){$scope.simpleTableResize.onMouseUpHandler(event, $scope, $element);});
                if(!$scope.simpleTableResize){
                    $scope.simpleTableResize = new SimpleTableResize.SimpleTableResize($scope, $element, $attrs, $window);
                }
                $scope.simpleTableResize.parent = parent;
                //$scope.simpleTableResize.doRegister();
                $scope.simpleTableResize.init();
                return $scope.simpleTableResize;
            }
        };
    }])
    .directive('stTableResizableHandler', ['$timeout', function($timeout){
        return {
            require: '^stTableResizable',
            restrict: 'A',
            link: function (scope, element, attrs, parentCtrl) {
                element.on('mousedown', function(event){parentCtrl.onMouseDownHandler(event, scope, element);});
            }
        };
    }]);