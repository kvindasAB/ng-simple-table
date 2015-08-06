/// <reference path="../app/typings/angularjs/angular.d.ts" />
/// <reference path="../app/typings/log4javascript/log4javascript.d.ts" />
/// <reference path="../app/typings/lodash/lodash.d.ts" />
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
declare module STUtil {
    class Util {
        static generateToken(len?: number): string;
    }
}
declare module STColumn {
    class Column {
        id: string;
        title: string;
        field: string;
        active: boolean;
        style: any;
        headerClass: any;
        cellClasses: any;
        cellClassesFunction: Function;
        cellTemplate: string;
        cellTemplateId: string;
        cellIdFunction: Function;
        cellValueFunction: Function;
        mutable: boolean;
        mutableProperties: string[];
        staticProperties: string[];
        optimizeTemplate: boolean;
        optimizeProperties: string[];
        _data: any;
        constructor(data?: any);
        syncFromData(data?: any): void;
        validateOptimizationProperties(data: any): void;
        validateOptimizationProperty(prop: string, alias: string, data: any, optimizedProps: string[]): void;
        getCustomCellValue(row: any): any;
        getDefaultCellValue(row: any): any;
        getCellValue(row: any): any;
        isMutableProperty(prop: string): boolean;
        isStaticProperty(prop: string): boolean;
        isOptimizedProperty(prop: string): boolean;
        hasStaticProperties(): boolean;
        hasCustomTemplate(): boolean;
    }
}
declare module STColumn {
    class ColumnManager {
        columns: STColumn.Column[];
        processConfig(tableConfig: any): void;
        createColumns(tableConfig: any): void;
    }
}
declare module SimpleTablePlugin {
    interface ISimpleTablePlugin {
        isInitializationComplete: boolean;
        simpleTable: any;
        parent: any;
        init(): void;
        isInitialized(): boolean;
        doRegister(parent?: any): void;
        onRegistered(simpleTable: any): void;
    }
}
declare module STCore {
    interface IDisposable {
        dispose(): void;
    }
}
declare module STCore {
    class Constants {
        static SELECTION_NONE: string;
        static SELECTION_SINGLE: string;
        static SELECTION_MULTIPLE: string;
        static RESIZE_RELATIVE: string;
        static RESIZE_FIXED: string;
        static UNIT_PIXELS: string;
        static UNIT_PERCENTAGE: string;
    }
}
declare module STCore {
    class Config {
        tableClasses: any;
        tableWidth: any;
        headerHeight: any;
        virtualScroll: boolean;
        columns: any;
        rowTemplate: any;
        rowTemplateId: any;
        selectionType: any;
        resizeType: any;
        listeners: any;
        methods: any;
        _data: any;
        constructor(data?: any);
        syncFromData(data?: any): void;
    }
}
declare module STCore {
    class ResizeManager {
        config: STCore.Config;
        constructor(config?: STCore.Config);
        resizeTable(): void;
        resizeTablePercentage(): void;
        resizeTableFixed(): void;
        getWidthInNumber(width: any): number;
        getWidthType(width: any): string;
        isResizePercentage(): boolean;
        isResizeFixed(): boolean;
    }
}
declare module SimpleTablePlugin {
    class BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePlugin {
        isInitializationComplete: boolean;
        simpleTable: any;
        parent: any;
        init(): void;
        doRegister(parent?: any): void;
        onRegistered(simpleTable: any): void;
        isInitialized(): boolean;
        addEventListeners(): void;
        removeEventListeners(): void;
        notifyListener(eventName: string, params: any): void;
    }
}
declare module SimpleTablePlugin {
    interface ISimpleTablePluginDataAware {
        onDataChanged(newValue: any, oldValue: any): void;
    }
}
declare module SimpleTableSelection {
    class SimpleTablePluginSelection extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePluginDataAware {
        scope: any;
        selectedRows: any[];
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        isRowSelected(row: any): boolean;
        setSelectedRows(rows: Array<any>): void;
        onRowClicked(scopeEvent: any, $event: any, row: any): any;
        addSelectedRow(row: any): any;
        doSingleSelection(row: any): void;
        doMultipleSelection(row: any): any[];
        isRowValid(row: any): boolean;
        revalidateSelection(): void;
        onDataChanged(newValue: any, oldValue: any): void;
        isSingleSelection(): boolean;
        isMultipleSelection(): boolean;
    }
}
declare module SimpleTableSort {
    class SimpleTablePluginSort extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePluginDataAware {
        scope: any;
        currentSortColumn: any;
        currentSort: any;
        currentSortReverse: boolean;
        init(): void;
        addEventListeners(): void;
        removePreviousSortFromColumns(columns: any[]): void;
        markColumnAsSorted(column: any): void;
        applyColumnSortState(column: any): void;
        applySort(column: any): void;
        sortByColumn(column: any): void;
        onHeaderClicked(scopeEvent: any, $event: any, column: any): any;
        revalidateSort(): void;
        onDataChanged(newValue: any, oldValue: any): void;
        switchColumnSortType(column: any): void;
        setSortByColumn(column: any, sortType: string): void;
        addToArray(array: any[], values: string[]): any[];
        removeFromArray(array: any[], values: string[]): any[];
    }
}
declare module SimpleTablePluginFactory {
    class SimpleTablePluginFactory {
        newPluginSelection(): SimpleTableSelection.SimpleTablePluginSelection;
        newPluginSort(): SimpleTableSort.SimpleTablePluginSort;
    }
}
declare module SimpleTable {
    class SimpleTable implements ISimpleTable {
        scope: any;
        element: any;
        attrs: any;
        managers: any;
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
declare module STCore {
    class BaseComponentUI implements STCore.IDisposable {
        scope: angular.IScope;
        element: any;
        attrs: angular.IAttributes;
        simpleTable: SimpleTable.SimpleTable;
        $compile: angular.ICompileService;
        $templateCache: angular.ITemplateCacheService;
        $templateRequest: angular.ITemplateRequestService;
        setServices($compile: angular.ICompileService, $templateCache: angular.ITemplateCacheService, $templateRequest: angular.ITemplateRequestService): void;
        link(scope: angular.IScope, element: any, attrs: angular.IAttributes, simpleTable: SimpleTable.SimpleTable): void;
        validateCustomTemplate(): void;
        shouldUseCustomTemplate(): boolean;
        getCustomTemplate(scope: angular.IScope): any;
        getTemplateByCacheId(tplId: any): string;
        getTemplateByUrl(tplUrl: any): any;
        optimizeAndApplyTemplate(tpl: string, scope: angular.IScope): void;
        applyTemplate(tpl: string, scope: angular.IScope): void;
        optimizeTemplate(tpl: string, scope: angular.IScope): string;
        optimizeTemplateParts(tpl: string, parts: any[]): string;
        optimizeTemplatePart(tpl: string, part: any): string;
        shouldOptimizeTemplate(tpl: string, scope: angular.IScope): boolean;
        dispose(): void;
    }
}
declare module STTemplates {
    class STTpls {
        static CELL_TPL: string;
        static CELL_BO_TPL: string;
        static ROW_TPL: string;
        static BODY_TPL: string;
        static BODY_VS_TPL: string;
        static COLUMN_TPL: string;
        static HEADER_TPL: string;
        static TABLE_TPL: string;
        static CELL_TPL_ID: string;
        static CELL_BO_TPL_ID: string;
        static ROW_TPL_ID: string;
        static BODY_TPL_ID: string;
        static BODY_VS_TPL_ID: string;
        static COLUMN_TPL_ID: string;
        static HEADER_TPL_ID: string;
        static TABLE_TPL_ID: string;
        static CELL_TPL_PAIR: any;
        static CELL_BO_TPL_PAIR: any;
        static ROW_TPL_PAIR: any;
        static BODY_TPL_PAIR: any;
        static BODY_VS_TPL_PAIR: any;
        static COLUMN_TPL_PAIR: any;
        static HEADER_TPL_PAIR: any;
        static TABLE_TPL_PAIR: any;
        getTemplates(): any[];
    }
}
declare module STCellUI {
    class Cell extends STCore.BaseComponentUI {
        cellIdWatcher: Function;
        cellClassesWatcher: Function;
        cellClassesFunctionWatcher: Function;
        cellValueWatcher: Function;
        init(): void;
        addWatchers(): void;
        addCellValueWatcher(): void;
        addCellIdWatcher(): void;
        addCellClassesWatcher(): void;
        addCellClassesFunctionWatcher(): void;
        arrayClasses(classVal: any): any;
        updateClasses(oldClasses: any, newClasses: any): void;
        arrayDifference(tokens1: any, tokens2: any): any[];
        addClasses(classes: any[]): void;
        removeClasses(classes: any): void;
        shouldUseCustomTemplate(): boolean;
        getCustomTemplate(scope: angular.IScope): any;
        applyDefaultTemplate(): void;
        optimizeTemplate(tpl: string, scope: angular.IScope): string;
    }
}
declare module STColumnUI {
    class Column extends STCore.BaseComponentUI {
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        onHeaderClicked(event: any): void;
    }
}
declare module SimpleTablePlugin {
    interface ISimpleTablePluginConfigAware {
        onConfigChanged(): void;
    }
}
declare module SimpleTableReorder {
    interface ISimpleTableReorderDrag {
        rootScope: any;
        scope: any;
        element: any;
        attrs: any;
        plugins: any;
        initPluginTimeout: Number;
        id: string;
        initUuid(): any;
        onDragStartHandler(event: any): void;
        onDragEndHandler(event: any): void;
    }
}
declare module SimpleTableReorder {
    interface ISimpleTableReorderDrop {
        rootScope: any;
        scope: any;
        element: any;
        attrs: any;
        id: any;
        initUuid(): void;
        onDragOverHandler(event: any): void;
        onDragEnterHandler(event: any): void;
        onDragLeaveHandler(event: any): void;
        onDropHandler(event: any): void;
        onDragStartHandler(): void;
        onDragEndHandler(): void;
    }
}
declare module SimpleTableReorder {
    class SimpleTableReorderUuidUtil {
        new(): string;
        empty(): string;
        constructor();
    }
}
declare module SimpleTableReorder {
    class SimpleTableReorderDrag extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTableReorder.ISimpleTableReorderDrag {
        DRAG_START_EVENT: string;
        DRAG_END_EVENT: string;
        SIMPLE_TABLE_DRAG_START_EVENT: string;
        SIMPLE_TABLE_DRAG_END_EVENT: string;
        uuid: SimpleTableReorder.SimpleTableReorderUuidUtil;
        rootScope: any;
        scope: any;
        element: any;
        attrs: any;
        plugins: any;
        initPluginTimeout: Number;
        id: string;
        init(): void;
        addEventListeners(): void;
        initUuid(): void;
        onDragStartHandler(event: any): void;
        onDragEndHandler(event: any): void;
        constructor(rootScope: any, scope: any, element: any, attrs: any);
    }
}
declare module SimpleTableReorder {
    class SimpleTableReorderDrop extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTableReorder.ISimpleTableReorderDrop {
        DRAG_OVER_EVENT: string;
        DRAG_ENTER_EVENT: string;
        DRAG_LEAVE_EVENT: string;
        DROP_EVENT: string;
        SIMPLE_TABLE_DRAG_START_EVENT: string;
        SIMPLE_TABLE_DRAG_END_EVENT: string;
        uuid: SimpleTableReorder.SimpleTableReorderUuidUtil;
        rootScope: any;
        scope: any;
        element: any;
        attrs: any;
        id: any;
        init(): void;
        addEventListeners(): void;
        initUuid(): void;
        onDragOverHandler(event: any): boolean;
        onDragEnterHandler(event: any): void;
        onDragLeaveHandler(event: any): void;
        onDropHandler(event: any): void;
        getIndexById(columns: any, id: any): number;
        onDragStartHandler(): void;
        onDragEndHandler(): void;
        constructor(rootScope: any, scope: any, element: any, attrs: any);
    }
}
declare module SimpleTableResize {
    interface ISimpleTableResize {
        scope: any;
        element: any;
        attrs: any;
        parent: any;
        initializationComplete: boolean;
        init(): any;
        isInitialized(): boolean;
        addEventListeners(): any;
        removeEventListeners(): any;
        onMouseDownHandler(event: any, scope: any, element: any): any;
        onMouseMoveHandler(event: any, scope: any, element: any): any;
        onMouseUpHandler(event: any, scope: any, element: any): any;
        calculateNewColumnWidth(tableConfig: any, actualWidth: any, moveWidth: any): string;
    }
}
declare module SimpleTableResize {
    class SimpleTableResize implements ISimpleTableResize {
        RESIZE_TYPE_FIXED: string;
        RESIZE_TYPE_ADJUSTABLE: string;
        WIDTH_PIXELS_TYPE: string;
        WIDTH_PERCENTAGE_TYPE: string;
        scope: any;
        element: any;
        attrs: any;
        parent: any;
        initializationComplete: boolean;
        $window: any;
        minColumnWidth: number;
        isMouseDown: boolean;
        startX: number;
        indexColumnResize: number;
        orginalColumnWidth: number;
        parentMoveHandle: any;
        table: any;
        tableHeaderColumnList: any;
        originalTableWidth: number;
        init(): void;
        isInitialized(): boolean;
        addEventListeners(): void;
        removeEventListeners(): void;
        constructor(scope: any, element: any, attrs: any, $window: any);
        onMouseDownHandler(event: any, scope: any, element: any): void;
        onMouseMoveHandler(event: any, scope: any, element: any): void;
        updateFixedTableColumns(event: any, tableConfig: any, scope: any): void;
        calculateNewTableWidth(extraWidth: any): string;
        updateAdjustableTableColumns(event: any, tableConfig: any, scope: any): void;
        calculateNewColumnWidth(tableConfig: any, actualWidth: any, moveWidth: any): string;
        calculatePixels(actualWidth: any, moveWidth: any): string;
        calculatePercentage(tableConfig: any, actualWidth: any, moveWidth: any): string;
        isMinColumnWidth(actualWidth: any, moveWidth: any): boolean;
        onMouseUpHandler(event: any, scope: any, element: any): void;
        updateOtherColumns(columnData: any, tableConfig: any): void;
        addWidth(widthToAdd: number, tableConfig: any, updatedColumnId: string): void;
        removeWidth(widthToRemove: number, tableConfig: any, updatedColumnId: string): void;
        convertToPixelsOrPercentage(originalWidth: number, widthType: string): string;
        getColumnDataById(id: string, tableConfig: any): any;
        getWidthInNumber(width: any): number;
        getWidthType(width: any): string;
    }
}
declare module STBodyUI {
    class Body extends STCore.BaseComponentUI {
        init(): void;
        shouldUseCustomTemplate(): boolean;
        validateCustomTemplate(): void;
        getDefaultTemplate(virtualScroll: boolean): string;
        applyTemplate(tpl: string, scope: any): void;
        getCustomTemplate(scope: angular.IScope): any;
        isVirtualScrollEnabled(): boolean;
    }
}
declare module STRowUI {
    class Row extends STCore.BaseComponentUI {
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        onRowClicked(event: any): void;
        onRowDoubleClicked(event: any): void;
        onRowMouseEnter(event: any): void;
        onRowMouseLeave(event: any): void;
    }
}
