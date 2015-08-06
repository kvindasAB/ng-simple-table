/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="../util/STUtil.d.ts" />
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
