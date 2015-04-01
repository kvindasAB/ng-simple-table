module SimpleTable {
    export interface ISimpleTable {
        // Attributes
        scope:any;
        element:any;
        attrs:any;
        plugins:any;

        // Methods
        init();
        initPlugins();
        registerPlugin(plugin:any);
        addEventListeners();
        removeEventListeners();
    }
}