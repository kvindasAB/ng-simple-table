'use strict';

var SimpleTableDirective = function(scope, element, attrs, $log){
  this.scope = scope;
  this.element = element;
  this.attrs = attrs;
  this.$log = $log;
  this.plugins = [];

  this.init();
  $log.log("SimpleTable created: ", this.scope);
};
SimpleTableDirective.prototype.init = function(){
  this.addListeners();
  this.validateConfig();
};
SimpleTableDirective.prototype.validateConfig = function() {
  //this.validateFilter();
};
SimpleTableDirective.prototype.validateFilter = function() {
  // Currently not required
  this.$log.log("validateFilter...", this.scope.tableConfig);
  this.scope.$watch("tableConfig.filter", angular.bind(this, this.onFilterUpdated) );
};
SimpleTableDirective.prototype.onFilterUpdated = function(newValue, oldValue) {
  // Currently not required
  if((!newValue && !oldValue) || newValue === oldValue){
    return;
  }
  this.$log.log("onFilterUpdated:", this.scope.tableConfig.filter);
};
SimpleTableDirective.prototype.addListeners = function(){
  //this.scope.$on("$destroy", this.removeListeners());
};
SimpleTableDirective.prototype.removeListeners = function(){
  this.$log.log("removing listeners...", this);
};

SimpleTableDirective.prototype.registerPlugin = function(plugin){
  this.$log.log("initializing plugins...");
  this.plugins.push(plugin);
  _.defer(angular.bind(this, this.initPlugins) );
};

SimpleTableDirective.prototype.initPlugins = function(){
  _.forEach(this.plugins, function(plugin){
    if(plugin.isInitialized() ){ return; }
    plugin.onRegistered();
  });
};


angular.module('simpletable.table', [])
  .directive('stTable', ['$log', function($log) {

    return {
      restrict: 'AE',
      scope: {
        tableConfig: "=",
        tableData: "="
      },
      controller: function($scope, $element, $attrs) {
        return new SimpleTableDirective($scope, $element, $attrs, $log);
      },
      template:
      "<table ng-class='tableConfig.classes'>" +
      "<thead>" +
      " <tr>" +
      "   <th ng-repeat='hcol in tableConfig.columns' ng-style='hcol.style' ng-class='hcol.headerClass'>{{hcol.title}}</th>" +
      " </tr>" +
      "</thead>" +
      "<tbody>" +
      " <tr ng-repeat='row in tableData | filter:tableConfig.filter'>" +
      "   <td ng-repeat='col in tableConfig.columns' ng-class='col.cellClass'>" +
      "     <span ng-if='!col.template'>{{row[col.field]}}</span>     " +
      "     <span ng-if='!!col.template' ng-include='col.template'></span>     " +
      "   </td>" +
      " </tr>" +
      "</tbody>" +
      "</table>"
    };


}]);
