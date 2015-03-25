'use strict';

var SimpleTableResizable = function(scope, element, attrs, parentCtrl, $log){
      this.scope = scope;
      this.element = element;
      this.attrs = attrs;
      this.$log = $log;
      this.parentCtrl = parentCtrl;
      this.initComplete = false;
      this.startX = 0;

      this.registerPlugin();
      //$log.log("SimpleTableResize created: ", arguments);
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
    this.startX = event.clientX;
    element.on('mousemove', function(event){this.onMouseMoveHandler(event, scope, element);});
    element.on('mouseup', function(event){this.onMouseUpHandler(event, scope, element);});
};

SimpleTableResizable.prototype.onMouseMoveHandler = function(event, scope, element){

};

SimpleTableResizable.prototype.onMouseUpHandler = function(event, scope, element){
    element.off('mousemove', function(event){this.onMouseMoveHandler(event, scope, element);});
    element.off('mouseup', function(event){this.onMouseUpHandler(event, scope, element);});
};

angular.module('simpletable.resizable', [])
    .directive('stTableResizable', ['$log', function($log){
        return {
            require: '^stTable',
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                return new SimpleTableResizable($scope, $element, $attrs, $log);
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