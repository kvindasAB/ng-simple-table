/// <reference path="ISimpleTablePluginFactory.ts" />
module SimpleTablePlugin {
    export class SimpleTablePluginFactory implements SimpleTablePlugin.ISimpleTablePluginFactory {
        // Attributes
        pluginClass:any;

        // Methods
        newInstance():void {
            return new this.pluginClass();
        }
    }
}