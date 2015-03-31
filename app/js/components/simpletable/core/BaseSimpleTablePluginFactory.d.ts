/// <reference path="ISimpleTablePluginFactory.d.ts" />
declare module SimpleTablePlugin {
    class SimpleTablePluginFactory implements SimpleTablePlugin.ISimpleTablePluginFactory {
        pluginClass: any;
        newInstance(): void;
    }
}
