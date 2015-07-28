/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="STConfig.ts" />
/// <reference path="STConstants.ts" />
/*
 * Handles table sizing and resizing.
 */
module STCore {
    export class ResizeManager {

        config:STCore.Config;

        constructor(config?:STCore.Config) {
            this.config = config;
        }

        resizeTable():void{
            if(this.isResizeFixed() ){
                this.resizeTableFixed();
                return;
            }
            this.resizeTablePercentage();
        }

        resizeTablePercentage():void{

        }

        resizeTableFixed():void{
            var columns:any = this.config.columns;
            var totalWidth:number = 0;
            for(var i = 0; i < columns.length; i++){
                var column:any = columns[i];
                if(!column.active){
                    continue;
                }
                totalWidth += this.getWidthInNumber(column.style.width);
            }
            this.config.tableWidth = totalWidth + 'px';
        }

        getWidthInNumber(width):number{
            var stringWidth:string = '';
            var widthType:string = this.getWidthType(width);
            if(widthType === STCore.Constants.UNIT_PIXELS){
                stringWidth = width.substring(0 , width.length - 2);
            }else{
                stringWidth = width.substring(0 , width.length - 1);
            }
            var columnWidth:number = parseFloat(stringWidth);
            return columnWidth;
        }

        getWidthType(width):string{
            var widthType:string = width.substring(width.length - 2, width.length);
            if(widthType === STCore.Constants.UNIT_PIXELS){
                return STCore.Constants.UNIT_PIXELS;
            }
            return STCore.Constants.UNIT_PERCENTAGE;
        }

        isResizePercentage():boolean {
            return !this.isResizeFixed();
        }

        isResizeFixed():boolean {
            return this.config.resizeType === STCore.Constants.RESIZE_FIXED;
        }


    }
}