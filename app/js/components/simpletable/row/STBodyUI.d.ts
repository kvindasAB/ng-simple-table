/// <reference path="../table/SimpleTable.d.ts" />
declare module STBodyUI {
    class Body {
        static DEFAULT_TPL: string;
        scope: any;
        element: any;
        attrs: any;
        simpleTable: SimpleTable.SimpleTable;
        $compile: any;
        parentCtrl: any;
        constructor();
        link(scope: any, element: any, attrs: any, simpleTable: SimpleTable.SimpleTable, $compile: any, parentCtrl: any): void;
        init(): void;
        validateCustomTemplate(): void;
        applyTemplate(tpl: string, scope: any): void;
        getCustomTemplate(scope: any): any;
    }
}
