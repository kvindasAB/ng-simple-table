'use strict';



angular.module('simpletable.table', [])
  .service('SimpleTableDirectiveFacetory', ['$log', '$timeout', 'SimpleTableSelectionFactory', function ($log, $timeout, SimpleTableSelectionFactory) {
    var SimpleTableDirective = function(scope, element, attrs){
      this.scope = scope;
      this.element = element;
      this.attrs = attrs;
      this.plugins = [];
      this.initPluginTimeout = null;
      this.scope.simpleTable = this;

      this.init();
      $log.log("SimpleTable created: ", this.scope);
    };
    SimpleTableDirective.prototype.init = function(){
        this.addListeners();
        this.validateConfig();
        this.initDefaultPlugins();
    };
    SimpleTableDirective.prototype.validateConfig = function() {
      //this.validateFilter();
    };
    SimpleTableDirective.prototype.validateFilter = function() {
      // Currently not required
      $log.log("validateFilter...", this.scope.tableConfig);
      this.scope.$watch("tableConfig.filter", angular.bind(this, this.onFilterUpdated) );
    };
    SimpleTableDirective.prototype.onFilterUpdated = function(newValue, oldValue) {
      // Currently not required
      if((!newValue && !oldValue) || newValue === oldValue){
        return;
      }
      $log.log("onFilterUpdated:", this.scope.tableConfig.filter);
    };

    SimpleTableDirective.prototype.initDefaultPlugins = function(){
      this.registerPlugin(SimpleTableSelectionFactory.newInstance());
    };

    SimpleTableDirective.prototype.addListeners = function(){
      this.scope.$on("$destroy", this.removeListeners);
    };
    SimpleTableDirective.prototype.removeListeners = function(){
      $log.log("removing listeners...", this);
    };

    SimpleTableDirective.prototype.registerPlugin = function(plugin){
      $log.log("initializing plugins...");
      this.plugins.push(plugin);
      this.initPlugins();
    };

    SimpleTableDirective.prototype.initPlugins = function(){
      if(this.initPluginTimeout){
        $timeout.cancel(this.initPluginTimeout);
        this.initPluginTimeout = null;
      }
      this.initPluginTimeout = $timeout(angular.bind(this, this.doInitPlugins), 0);
    };

    SimpleTableDirective.prototype.doInitPlugins = function(){
      var self = this;
      angular.forEach(this.plugins, function(plugin){
        if(plugin.isInitialized() ){ return; }
        plugin.onRegistered(self);
      });
    };

    SimpleTableDirective.prototype.onRowClicked = function($event, row){
      $log.log("Row clicked: ", arguments);
      this.scope.$broadcast("onRowClicked", $event, row);
    };


    // Factory
    var Factory = function(){
    };
    Factory.prototype.newInstance = function($scope, $element, $attrs){
      return new SimpleTableDirective($scope, $element, $attrs);
    };
    return new Factory();
  }])
  .directive('stTable', ['SimpleTableDirectiveFacetory', function(SimpleTableDirectiveFacetory) {

    return {
          restrict: 'AE',
          scope: {
                tableConfig: '=',
                tableData: '='
          },
          controller: function($scope, $element, $attrs) {
                return SimpleTableDirectiveFacetory.newInstance($scope, $element, $attrs);
          },
          template:
              "<table style='overflow: auto;' ng-class='tableConfig.classes'>" +
              "  <thead>" +
              "    <tr>" +
              "      <th class='table-header' ng-repeat='hcol in tableConfig.columns' ng-class='hcol.headerClass' " +
              "      height='{{tableConfig.headerHeight}}' width='{{hcol.style.width}}' st-table-drop-target='true' " +
              "      st-table-draggable='true'>" +
              "        {{hcol.title}}" +
              "        <div st-table-resizable-handler class='table-header-cursor-container'></div>" +
              "      </th>" +
              "    </tr>" +
              "  </thead>" +
              "  <tbody>" +
              "    <tr ng-click='simpleTable.onRowClicked($event, row)' ng-class='{selected: isRowSelected(row)}' ng-repeat='row in tableData | filter:tableConfig.filter' >" +
              "      <td ng-repeat='col in tableConfig.columns' ng-class='col.cellClass'>" +
              "        <span ng-if='!col.template'>{{row[col.field]}}</span>     " +
              "        <span ng-if='!!col.template' ng-include='col.template'></span>     " +
              "      </td>" +
              "    </tr>" +
              "  </tbody>" +
              "</table>"
    };


}]);
