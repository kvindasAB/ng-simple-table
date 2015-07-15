declare module STCellUI {
    class Cell {
        scope: any;
        element: any;
        attrs: any;
        $compile: any;
        constructor();
        link(scope: any, element: any, attrs: any, $compile: any): void;
        init(): void;
        validateCustomTemplate(): void;
        getCustomTemplate(scope: any): any;
    }
}
