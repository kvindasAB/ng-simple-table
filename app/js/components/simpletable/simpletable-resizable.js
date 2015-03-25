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
// Called by parent to understand if plugin is initialized
SimpleTableResizable.prototype.isInitialized = function(){
  return this.initComplete;
};
SimpleTableResizable.prototype.init = function(){
  this.$log.log("resizable init....");
  this.initComplete = true;
};


angular.module('simpletable.resizable', [])
  .directive('stTableResizable', ['$log', function($log) {

    return {
      require: '^stTable',
      restrict: 'A',
      link: function (scope, element, attrs, parentCtrl) {
        return new SimpleTableResizable(scope, element, attrs, parentCtrl, $log);
      }
    };
}]);
