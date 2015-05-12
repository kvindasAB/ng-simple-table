/// <reference path="ISimpleTable.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.d.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
declare module SimpleTable {
    class SimpleTable implements ISimpleTable {
        RESIZE_TYPE_FIXED: string;
        RESIZE_TYPE_ADJUSTABLE: string;
        WIDTH_PIXELS_TYPE: string;
        WIDTH_PERCENTAGE_TYPE: string;
        scope: any;
        element: any;
        attrs: any;
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
        validateConfig(): void;
        initDefaultPlugins(): void;
        initFixedTable(): void;
        getWidthInNumber(width: any): number;
        getWidthType(width: any): string;
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
