'use strict';

var SimpleTableResizable = function(scope, element, attrs, $log){
    this.minColumnWidth = 25;
    this.scope = scope;
    this.element = element;
    this.attrs = attrs;
    this.$log = $log;
    this.parentCtrl = null;
    this.initComplete = false;
    this.isMouseDown = false;
    this.startX = 0;
    this.indexColumnResize = 0;
    this.orginalColumnWidth = 0;

    this.registerPlugin();
    $log.log("SimpleTableResize created: ", arguments);
};

SimpleTableResizable.prototype.registerPlugin = function(){
    //this.parentCtrl.registerPlugin(this);
};

// Called by parent on starting plugin
SimpleTableResizable.prototype.onRegistered = function(){
    this.$log.log("onRegistered:", this);
    this.init();
};

SimpleTableResizable.prototype.init = function(){
    this.$log.log("resizable init....");
    this.initComplete = true;
};

SimpleTableResizable.prototype.isInitialized = function(){
    return this.initComplete;
};

SimpleTableResizable.prototype.onMouseDownHandler = function(event, scope, element){
    this.isMouseDown = true;
    this.startX = event.clientX;
    this.indexColumnResize = scope.this.$index;
    this.orginalColumnWidth = scope.hcol.style.width;
    //window.on('mousemove', function(event){scope.simpleTableResizable.onMouseMoveHandler(event, scope, element);});
    //window.on('mouseup', function(event){scope.simpleTableResizable.onMouseUpHandler(event, scope, element);});
};

SimpleTableResizable.prototype.onMouseMoveHandler = function(event, scope, element){
    if(!this.isMouseDown){
        return;
    }
    var width = 0;
    width = event.clientX - this.startX;
    scope.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(this.orginalColumnWidth, width);
    scope.$apply();
    this.$log.log('width: ' + width);
};

SimpleTableResizable.prototype.calculateNewColumnWidth = function(actualWidth, moveWidth){
    var stringWidth = actualWidth.substring(0 , actualWidth.length - 2);
    var columnWidth = parseInt(stringWidth);
    columnWidth = columnWidth + moveWidth;

    if(this.minColumnWidth > columnWidth){
        columnWidth = this.minColumnWidth;
    }
    this.$log.log('stringWidth: ' + stringWidth);
    return columnWidth + 'px';
};

SimpleTableResizable.prototype.onMouseUpHandler = function(event, scope, element){
    this.isMouseDown = false;
    //window.off('mousemove', function(event){scope.simpleTableResizable.onMouseMoveHandler(event, scope, element);});
    //window.off('mouseup', function(event){scope.simpleTableResizable.onMouseUpHandler(event, scope, element);});
};

angular.module('simpletable.resizable', [])
    .directive('stTableResizable', ['$log', function($log){
        return {
            require: '^stTable',
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                if(!$scope.simpleTableResizable){
                    $scope.simpleTableResizable = new SimpleTableResizable($scope, $element, $attrs, $log);
                }
                return $scope.simpleTableResizable;
            },
            link: function($scope, $element, $attrs, parentCtrl) {
                $element.on('mousemove', function(event){$scope.simpleTableResizable.onMouseMoveHandler(event, $scope, $element);});
                $element.on('mouseup', function(event){$scope.simpleTableResizable.onMouseUpHandler(event, $scope, $element);});
                if(!$scope.simpleTableResizable){
                    $scope.simpleTableResizable = new SimpleTableResizable($scope, $element, $attrs, $log);
                }
                $scope.simpleTableResizable.parentCtrl = parentCtrl;
                $scope.simpleTableResizable.registerPlugin();
                return $scope.simpleTableResizable;
            }
        };
    }])
    .directive('stTableResizableHandler', ['$log', function($log){
        return {
            require: '^stTableResizable',
            restrict: 'A',
            link: function (scope, element, attrs, parentCtrl) {
                element.on('mousedown', function(event){parentCtrl.onMouseDownHandler(event, scope, element);});
            }
        };
    }]);