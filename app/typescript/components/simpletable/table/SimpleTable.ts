/// <reference path="ISimpleTable.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
module SimpleTable {
    export class SimpleTable implements ISimpleTable {
        // statics

        // Attributes
        scope:any;
        element:any;
        attrs:any;
        plugins:Array<SimpleTablePlugin.ISimpleTablePlugin> = [];
        initPluginTimeout:Number;
        initializationComplete:boolean = false;


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
            console.log("SimpleTable created: ", this.scope);
        }

        init():void{
            this.notifyPreInitialization();
            this.addEventListeners();
            this.validateConfig();
            this.initDefaultPlugins();
        }

        registerPlugin(plugin:SimpleTablePlugin.ISimpleTablePlugin):void{
            console.log("initializing plugins...", plugin);
            this.plugins.push(plugin);
            this.initPlugins();
        }

        initPlugins():void{
            if(this.initPluginTimeout){
                this.$timeout.cancel(this.initPluginTimeout);
                this.initPluginTimeout = null;
            }
            this.initPluginTimeout = this.$timeout(angular.bind(this, this.doInitPlugins), 0);
        }
        addEventListeners():void{
            this.scope.$on("$destroy", this.removeEventListeners);
            this.scope.$watch("tableData", angular.bind(this, this.onDataChanged));
        }

        removeEventListeners():void{
            console.log("removing listeners...", this);
        }

        validateConfig():void {
        }

        initDefaultPlugins():void{
            this.pluginFactory.newPluginSelection().doRegister(this);
            this.pluginFactory.newPluginSort().doRegister(this);
        }

        doInitPlugins():void{
            var self = this;
            angular.forEach(this.plugins, function(plugin){
                if(plugin.isInitialized() ){ return; }
                plugin.onRegistered(self);
            });
            this.notifyInitializationComplete();
        }

        onDataChanged(newValue, oldValue):void {
            console.log("SimpleTable.onDataChanged...: ", this.initializationComplete);
            if(this.initializationComplete){
                this.notifyPluginsDataChanged(newValue, oldValue);
            }
        }

        onRowClicked($event, row):void{
            //console.log("Row clicked: ", arguments);
            this.scope.$broadcast("onRowClicked", $event, row);
            this.notifyListener('onRowClicked', [$event, row]);
        }

        onRowDoubleClicked($event, row):void{
            //console.log("Row Double Clicked: ", arguments);
            this.scope.$broadcast("onRowDoubleClicked", $event, row);
            this.notifyListener('onRowDoubleClicked', [$event, row]);
        }

        onRowMouseEnter($event, row):void{
            //console.log("Row mouse enter: ", arguments);
            this.scope.$broadcast("onRowMouseEnter", $event, row);
            this.notifyListener('onRowMouseEnter', [$event, row]);
        }

        onRowMouseLeave($event, row):void{
            //console.log("Row mouse leave: ", arguments);
            this.scope.$broadcast("onRowMouseLeave", $event, row);
            this.notifyListener('onRowMouseLeave', [$event, row]);
        }

        onHeaderClicked($event, column):void{
            console.log("Header clicked: ", arguments);
            this.scope.$broadcast("onHeaderClicked", $event, column);
        }

        notifyPreInitialization():void {
            this.notifyListener("onPreInitialization", this);
        }

        notifyInitializationComplete():void {
            if(this.initializationComplete){
                return;
            }
            this.initializationComplete = true;
            this.notifyListener("onInitializationComplete", this);
        }

        notifyListener(eventName:string, params:any):void {
            if(!this.scope.tableConfig.listeners || !this.scope.tableConfig.listeners[eventName]){
                return;
            }
            //this.scope.tableConfig.listeners[eventName].apply(this.scope.tableConfig.listeners, params);
            this.scope.tableConfig.listeners[eventName](params);
        }

        notifyPluginsDataChanged(newValue:any, oldValue:any):void {
            for(var i:number = 0; i < this.plugins.length; i++){
                var plugin:any = this.plugins[i];
                if(!plugin.onDataChanged){
                    continue;
                }
                plugin.onDataChanged(newValue, oldValue);
            }
        }

    }
}