declare module STCell {
    class Cell {
        scope: any;
        element: any;
        attrs: any;
        constructor();
        link(scope: any, element: any, attrs: any): void;
    }
}
