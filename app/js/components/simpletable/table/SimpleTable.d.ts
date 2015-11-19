/// <reference path="ISimpleTable.d.ts" />
/// <reference path="../column/STColumnManager.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.d.ts" />
/// <reference path="../core/STConfig.d.ts" />
/// <reference path="../resize/ResizeManager.d.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
declare module SimpleTable {
    class SimpleTable implements ISimpleTable {
        id: any;
        scope: any;
        element: any;
        attrs: any;
        managers: any;
        uiParts: any;
        plugins: Array<SimpleTablePlugin.ISimpleTablePlugin>;
        initPluginTimeout: Number;
        initializationComplete: boolean;
        $timeout: any;
        pluginFactory: SimpleTablePluginFactory.SimpleTablePluginFactory;
        constructor(scope: any, element: any, attrs: any, $timeout: any, pluginFactory: SimpleTablePluginFactory.SimpleTablePluginFactory);
        init(): void;
        registerPlugin(plugin: SimpleTablePlugin.ISimpleTablePlugin): void;
        initPlugins(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        processConfig(): void;
        initManagers(): void;
        initDefaultPlugins(): void;
        resizeTable(): void;
        doInitPlugins(): void;
        onDataChanged(newValue: any, oldValue: any): void;
        onRowClicked($event: any, row: any): void;
        onRowDoubleClicked($event: any, row: any): void;
        onRowMouseEnter($event: any, row: any): void;
        onRowMouseLeave($event: any, row: any): void;
        onHeaderClicked($event: any, column: any): void;
        notifyPreInitialization(): void;
        notifyInitializationComplete(): void;
        notifyListener(eventName: string, params: any): void;
        notifyPluginsDataChanged(newValue: any, oldValue: any): void;
    }
}
