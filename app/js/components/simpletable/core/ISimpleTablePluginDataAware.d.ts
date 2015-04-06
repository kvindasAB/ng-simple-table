declare module SimpleTablePlugin {
    /**
     * Interface of plugins with the need to be aware of data changes
     */
    interface ISimpleTablePluginDataAware {
        onDataChanged(newValue: any, oldValue: any): void;
    }
}
