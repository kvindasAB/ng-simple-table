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
            var tableWidth = this.getTableWidthByColumnsInPx(this.getColumns() );
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

        getTableRealWidthInPx():number{
            return angular.element(this.table.element).outerWidth(true);
        }

        getTableWidthByColumnsInPx(cols:STColumn.Column[]):number{
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
                col._widthInPx = this.measureColumnHeaderUIInPx(col);
            }
            console.log('column width: ', col._widthInPx);
            return col._widthInPx;
        }

        measureColumnListHeaderUIInPx(cols:STColumn.Column[]):void {
            for(var i:number = 0; i < cols.length; i++){
                var col:STColumn.Column = cols[i];
                col._widthInPx = this.measureColumnHeaderUIInPx(col);
            }
        }

        measureColumnHeaderUIInPx(col:STColumn.Column):number {
            var colHeaderUI:any = this.getColumnHeaderUI(col);
            return colHeaderUI.outerWidth(true);
        }

        getColumnHeaderUI(col:STColumn.Column):any {
            var header:any  = this.getTableHeaderUI(col);
            var tr:any      = header && header.children ? angular.element(header.children()[0]) : null,
                ths:any     = tr && tr.children ? tr.children() : null;
            for(var i:number =0; i < ths.length; i++){
                var thItem = angular.element(ths[i]);
                if(thItem.attr('id') === col.id){
                    return thItem;
                }
            }
            return null;
        }

        getTableHeaderUI(col:STColumn.Column):any {
            return this.table.uiParts.thead;
        }

        resizeColumn(col:STColumn.Column, baseWidth:number, wdiff:number):void{
            if(this.isResizeTypeFixed()){
                this.resizeColumnFixed(col, baseWidth, wdiff);
                return;
            }
            this.resizeColumnRelative(col, baseWidth, wdiff);
        }

        resizeColumnRelative(col:STColumn.Column, baseWidth:number, wdiff:number):void {
            var cols:STColumn.Column[] = this.getColumns();
            this.measureColumnListHeaderUIInPx(cols );
            var tableWidth:number = this.getTableRealWidthInPx();
            var newWidth:number = baseWidth + wdiff;
            this.updateColumnWidthRelative(col, newWidth, tableWidth);
            /*for(var i:number=0; i < cols.length; i++){
                var tmpCol:STColumn.Column = cols[i];
                if(tmpCol === col){ continue; }
                this.updateColumnWidthRelative(tmpCol, tmpCol._widthInPx, tableWidth);
            }*/
        }

        resizeColumnFixed(col:STColumn.Column, baseWidth:number, wdiff:number):void {
            var newWidth:number = baseWidth + wdiff, that = this;
            var cols:STColumn.Column[] = this.getColumns();
            this.measureColumnListHeaderUIInPx(cols);
            col._widthInPx = newWidth;
            this.updateColumnWidthFixed(col, newWidth);
            this.updateTableWidthByColumnsAndResizeColumnWidthInPx(this.getColumns(), col, newWidth);
            //this.updateTableWidthByColumnsWidthInPx(this.getColumns());
        }

        updateColumnWidthRelative(col:STColumn.Column, newWidth:number, tableWidth:number):void {
            var percentage = (newWidth / tableWidth) * 100;
            col.style = col.style ? col.style : {};
            col.style.width = percentage + STCore.Constants.UNIT_PERCENTAGE;
            //console.log('updating col:', col.field, col.style.width, newWidth, tableWidth);
        }

        updateColumnWidthFixed(col:STColumn.Column, newWidth:number):void {
            console.log('New Width: ', newWidth);
            col.style = col.style ? col.style : {};
            col.style.width = newWidth + STCore.Constants.UNIT_PIXELS;
        }

        updateTableWidthByColumnsWidthInPx(cols:STColumn.Column[]):void {
            var tableWidth:number = this.getTableWidthByColumnsInPx(cols);
            console.log('updateTableWidthByColumnsWidthInPx:', tableWidth, _.pluck(cols,'_widthInPx'));
            this.tableConfig.tableWidth = tableWidth;
        }

        updateTableWidthByColumnsAndResizeColumnWidthInPx(cols:STColumn.Column[], col:STColumn.Column, newWidth:number):void{
            var colsWithoutCol:STColumn.Column[], colArray:STColumn.Column[], realColWidth:number, tableWidth:number;
            colsWithoutCol = _.filter(cols, function(column){
                return column.id !== col.id;
            });
            colArray = _.filter(cols, function(column){
                return column.id === col.id;
            });
            tableWidth = this.getTableWidthByColumnsInPx(colsWithoutCol);
            realColWidth = this.getTableWidthByColumnsInPx(cols);
            tableWidth += (newWidth - realColWidth);
            this.tableConfig.tableWidth = tableWidth;
        }

        // Events

        onResizeMouseDownHandler(event:any, scope:any, element:any, $window:any):void {
            console.log('onMouseDownHandler: ', this, scope, element);
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            var $windowEl:any = angular.element($window),
                originX:number = event.clientX,
                baseWidth:number = this.getColumnRealWidthInPx(scope.hcol),
                moveHandler:Function = angular.bind(this, function (event) {
                    this.onResizeMouseMoveHandler(event, baseWidth, originX, scope.hcol);
                    scope.$apply();
                }),
                upHandler:Function = angular.bind(this, function (event) {
                    $windowEl.off('mousemove', moveHandler);
                    $windowEl.off('mouseup', upHandler);
                    this.enableResizeCursor(false);
                    this.onResizeMouseUpHandler(event);
                });
            console.log('baseWidth:', baseWidth, this);
            this.enableResizeCursor(true);
            $windowEl.on('mousemove', moveHandler);
            $windowEl.on('mouseup', upHandler);
        }

        onResizeMouseMoveHandler(event:any, baseWidth:number, originX:number, col:STColumn.Column):void {
            //console.log('onMouseMoveHandler: ', arguments, this);
            var wdiff = event.clientX - originX;
            this.resizeColumn(col, baseWidth, wdiff);
        }

        onResizeMouseUpHandler(event:any):void {
            console.log('onMouseUpHandler: ', arguments, this);
        }

        enableResizeCursor(enable:boolean):void {
            if(enable){
                angular.element('body').addClass('resize-cursor');
                return;
            }
            angular.element('body').removeClass('resize-cursor');
        }

    }
}