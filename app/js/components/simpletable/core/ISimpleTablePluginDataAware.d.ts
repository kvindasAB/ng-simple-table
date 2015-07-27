declare module SimpleTablePlugin {
    interface ISimpleTablePluginDataAware {
        onDataChanged(newValue: any, oldValue: any): void;
    }
}
