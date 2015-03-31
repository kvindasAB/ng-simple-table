declare module SimpleTablePlugin {
    interface ISimpleTablePluginFactory {
        pluginClass: any;
        newInstance(): void;
    }
}
