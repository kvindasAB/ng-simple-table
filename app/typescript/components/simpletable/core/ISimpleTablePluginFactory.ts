module SimpleTablePlugin {
    export interface ISimpleTablePluginFactory {
        // Attributes
        pluginClass:any;
        // Methods
        newInstance():void;
    }
}