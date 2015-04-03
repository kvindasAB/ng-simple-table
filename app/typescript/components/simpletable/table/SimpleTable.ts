/// <reference path="ISimpleTable.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
module SimpleTable {
    export class SimpleTable implements ISimpleTable {
        // statics
        log = log4javascript.getLogger("SimpleTable");

        // Attributes
        scope:any;
        element:any;
        attrs:any;
        plugins:any = [];
        initPluginTimeout:Number;

        // Services
        $timeout:any;
        pluginFactory:SimpleTablePluginFactory.SimpleTablePluginFactory;

        // Methods
        constructor(scope:any, element:any, attrs:any, $timeout, pluginFactory:SimpleTablePluginFactory.SimpleTablePluginFactory){
            // base
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;

            // services
            this.$timeout = $timeout;
            this.pluginFactory = pluginFactory;

            // variables
            this.scope.simpleTable = this;

            this.init();
            this.log.debug("SimpleTable created: ", this.scope);
        }

        init():void{
            this.addEventListeners();
            this.validateConfig();
            this.initDefaultPlugins();
        }

        initPlugins = function(){
            if(this.initPluginTimeout){
                this.$timeout.cancel(this.initPluginTimeout);
                this.initPluginTimeout = null;
            }
            this.initPluginTimeout = this.$timeout(angular.bind(this, this.doInitPlugins), 0);
        }

        registerPlugin = function(plugin){
            this.log.debug("initializing plugins...");
            this.plugins.push(plugin);
            this.initPlugins();
        }

        addEventListeners(){
            this.scope.$on("$destroy", this.removeEventListeners);
        }

        removeEventListeners(){
            this.log.debug("removing listeners...", this);
        }

        validateConfig = function() {
        }

        initDefaultPlugins = function(){
            this.pluginFactory.newPluginSelection().doRegister(this);
        }

        doInitPlugins = function(){
            var self = this;
            angular.forEach(this.plugins, function(plugin){
                if(plugin.isInitialized() ){ return; }
                plugin.onRegistered(self);
            });
        }

        onRowClicked = function($event, row){
            this.log.debug("Row clicked: ", arguments);
            this.scope.$broadcast("onRowClicked", $event, row);
        };

    }
}