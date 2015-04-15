'use strict';

angular.module('simpletable.core.selection', [])
    .service('SimpleTableSelectionFactory', ['$log', function($log) {

        var SimpleTableSelection = function(){
            this.simpleTable = null;
            this.scope = null;
            this.initComplete = false;
        };
        SimpleTableSelection.prototype.init = function(simpleTable){
            this.simpleTable = simpleTable;
            this.scope = this.simpleTable.scope;
            this.initScope();
            this.addListeners();
            this.initComplete = true;
        };

        SimpleTableSelection.prototype.initScope = function(){
            this.scope.selectedRows = [];
            this.scope.isRowSelected = this.isRowSelected;
        };

        // Executed inside scope
        SimpleTableSelection.prototype.isRowSelected = function(row){
            $log.log("isSelected: ", this.selectedRows.indexOf(row));
            return (this.selectedRows.indexOf(row) > -1);
        };

        SimpleTableSelection.prototype.onRowClicked = function(scopeEvent, $event, row){
            $log.log("SimpleTableSelection.onRowClicked:", arguments);
            if(this.scope.tableConfig.selectionMultiple){
                return this.doMultipleSelection($event, row);
            }
            return this.doSingleSelection($event, row);
        };

        SimpleTableSelection.prototype.doSingleSelection = function($event, row){
            var index = this.scope.selectedRows.indexOf(row);
            this.scope.selectedRows.length = 0;
            if(index > -1){
                return;
            }
            this.scope.selectedRows.push(row);
            $log.log("selectedRows: ", this.scope.selectedRows);
        };

        SimpleTableSelection.prototype.doMultipleSelection = function($event, row){
            var index = this.scope.selectedRows.indexOf(row);
            if(index > -1){
                return this.scope.selectedRows.splice(index,1);
            }
            this.scope.selectedRows.push(row);
        };

        SimpleTableSelection.prototype.addListeners = function(){
            this.scope.$on("onRowClicked", angular.bind(this, this.onRowClicked));
            this.scope.$on("$destroy", this.removeListeners);
        };
        SimpleTableSelection.prototype.removeListeners = function(){

        };
        // Called by parent on starting plugin
        SimpleTableSelection.prototype.onRegistered = function(simpleTable){
            $log.log("SimpleTableCoreSelection.onRegistered:", this);
            this.init(simpleTable);
        };
        // Called by parent to understand if plugin is initialized
        SimpleTableSelection.prototype.isInitialized = function(){
            return this.initComplete;
        };

        // Factory
        var Factory = function(){
        };
        Factory.prototype.newInstance = function(){
            return new SimpleTableSelection();
        };
        return new Factory();

    }]);
