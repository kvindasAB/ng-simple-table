/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/STConfig.ts" />
/// <reference path="../core/STConstants.ts" />
module STResize {
    export class ResizeManager {

        // Attributes
        table:SimpleTable.SimpleTable;
        tableConfig:STCore.Config;

        constructor(table:SimpleTable.SimpleTable, config:STCore.Config){
            this.table = table;
            this.tableConfig = config;
        }

        // Methods
        resizeTable():void{
            if(this.isResizeTypeFixed()){
                this.resizeTableFixed();
                return;
            }
            this.resizeTableRelative();
        }

        resizeTableFixed():void {
            var tableWidth = this.calculateTableWidthByColumnsInPx(this.getColumns() );
            this.tableConfig.tableWidth = tableWidth + STCore.Constants.UNIT_PIXELS;
        }

        resizeTableRelative():void {
            // Relative do not require calculation due to current method usage.
        }

        isResizeTypeFixed():boolean {
            return this.tableConfig.resizeType === STCore.Constants.RESIZE_FIXED;
        }

        isResizeTypeRelative():boolean {
            return !this.isResizeTypeFixed();
        }

        isResizeActive():boolean {
            return this.tableConfig.isResizeActive();
        }

        getColumns():STColumn.Column[]{
            return this.tableConfig.columns;
        }

        calculateTableWidthByColumnsInPx(cols:STColumn.Column[]):number{
            this.measureColumnListHeaderUIInPx(cols);
            var cols:STColumn.Column[] = this.getColumns();
            var tableWidth = 0;
            for(var i:number = 0; i < cols.length; i++){
                var col:STColumn.Column = cols[i];
                tableWidth += this.getColumnRealWidthInPx(col);
            }
            return tableWidth;
        }

        getColumnRealWidthInPx(col:STColumn.Column):number {
            if(angular.isUndefined(col._widthInPx) ){
                this.measureColumnHeaderUIInPx(col);
            }
            return col._widthInPx;
        }

        measureColumnListHeaderUIInPx(cols:STColumn.Column[]):void {
            for(var i:number; i < cols.length; i++){
                var col:STColumn.Column = cols[i];
                col._widthInPx = this.measureColumnHeaderUIInPx(col);
            }
        }

        measureColumnHeaderUIInPx(col:STColumn.Column):number {
            var colHeaderUI:any = this.getColumnHeaderUI(col);
            return colHeaderUI.outerWidth(true);
        }

        getColumnHeaderUI(col:STColumn.Column):any {
            var header:any = this.getTableHeaderUI(col);
            var ths = header.children();
            for(var i:number =0; i < ths.length; i++){
                var thItem = ths[i];
                if(thItem.attr('id') === col.id){
                    return thItem;
                }
            }
            return null;
        }

        getTableHeaderUI(col:STColumn.Column):any {
            return this.table.uiParts.thead;
        }

    }
}