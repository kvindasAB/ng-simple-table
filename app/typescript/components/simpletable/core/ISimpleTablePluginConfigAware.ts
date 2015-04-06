module SimpleTablePlugin {
    /**
     * Interface of plugins with the need to be aware of table config changes
     */
    export interface ISimpleTablePluginConfigAware {
        // Methods
        onConfigChanged():void;
    }
}