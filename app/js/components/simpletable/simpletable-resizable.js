'use strict';

var SimpleTableResizable = function(scope, element, attrs, parentCtrl, $log){
      this.scope = scope;
      this.element = element;
      this.attrs = attrs;
      this.$log = $log;
      this.parentCtrl = parentCtrl;
      this.initComplete = false;

      this.registerPlugin();
      $log.log("SimpleTableResize created: ", arguments);
};

SimpleTableResizable.prototype.registerPlugin = function(){
    this.parentCtrl.registerPlugin(this);
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
        var stTableResizableHandlerObj = {
            require: '^stTableResizable',
            restrict: 'A',
            link: function (scope, element, attrs, parentCtrl) {
                element.on('click', function(){stTableResizableHandlerObj.onMoveHandler(scope, element);});
                return new SimpleTableResizable(scope, element, attrs, parentCtrl, $log);
            },
            onMoveHandler: function(scope, element){
                $log.log("resize handler works");
            }
        };
        return stTableResizableHandlerObj;
    }]);