module SimpleTablePlugin {
    /**
     * Interface of plugins with the need to be aware of data changes
     */
    export interface ISimpleTablePluginDataAware {
        // Methods
        onDataChanged(newValue, oldValue):void;
    }
}