/// <reference path="SimpleTableResize.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
angular.module('simpletable.resizable', [])
    .directive('stTableResizable', ['$timeout', '$window', function($timeout, $window){
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
                console.log('TableResize:', $element, $scope, parent.getSimpleTable() );
                if(!$scope.simpleTableResize){
                    $scope.simpleTableResize = new SimpleTableResize.SimpleTableResize($scope, $element, $attrs, $window);
                }
                $scope.simpleTableResize.simpleTable = parent.getSimpleTable();
                $scope.simpleTableResize.init();
                return $scope.simpleTableResize;
            }
        };
    }])
    .directive('stTableResizableHandler', ['$timeout', '$window', function($timeout, $window){
        return {
            require: '^stTable',
            restrict: 'A',
            link: function (scope, element, attrs, parentCtrl) {
                console.log('stResizeHandler: ', element, scope, parentCtrl.getSimpleTable(), parentCtrl.getSimpleTable().element );
                var stable:SimpleTable.SimpleTable = parentCtrl.getSimpleTable();
                if(!parentCtrl){return;}
                element.on('mousedown', function(event){
                    stable.managers.resizeManager.onResizeMouseDownHandler(event, scope, element, $window);
                });
            }
        };
    }]);