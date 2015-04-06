declare module SimpleTable {
    interface ISimpleTable {
        scope: any;
        element: any;
        attrs: any;
        plugins: any;
        init(): any;
        initPlugins(): any;
        registerPlugin(plugin: any): any;
        addEventListeners(): any;
        removeEventListeners(): any;
    }
}
