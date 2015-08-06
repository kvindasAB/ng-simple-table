/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../tpl/STTemplates.ts" />
/// <reference path="../column/STColumn.ts" />
module STCellUI {
    export class Cell extends STCore.BaseComponentUI {

        cellIdWatcher:Function;
        cellClassesWatcher:Function;
        cellClassesFunctionWatcher:Function;
        cellValueWatcher:Function;

        init(){
            if(this.shouldUseCustomTemplate()){
                this.validateCustomTemplate();
                this.addWatchers();
                return;
            }
            this.applyDefaultTemplate();
            this.addWatchers();
        }

        addWatchers():void {
            this.addCellIdWatcher();
            this.addCellClassesWatcher();
            this.addCellClassesFunctionWatcher();
            if(!this.shouldUseCustomTemplate()){
                this.addCellValueWatcher();
            }
        }

        addCellValueWatcher():void {
            var self = this;
            this.cellValueWatcher = this.scope.$watch('col.getCellValue(row, col, tableConfig)', function(newValue, oldValue){
                var col:STColumn.Column = (<any>self.scope).col;
                self.element.text(newValue);
                if(angular.isUndefined(newValue)){ return; }
                if(col.isStaticProperty('cellValue')){
                    self.cellValueWatcher();
                }
            });
        }

        addCellIdWatcher():void {
            var self = this;
            this.cellIdWatcher = this.scope.$watch('col.cellIdFunction', function(newValue, oldValue){
                var col:STColumn.Column = (<any>self.scope).col;
                if(!newValue || newValue === angular.noop){
                    if(col.isOptimizedProperty('cellId')){ self.cellIdWatcher(); }
                    return;
                }
                var value = newValue((<any>self.scope).row, (<any>self.scope).col, (<any>self.scope).tableConfig);
                self.element.attr('id', value );
                // Remove watcher is static
                if(col.isStaticProperty('cellId')){ self.cellIdWatcher(); }
            });
        }

        addCellClassesWatcher():void {
            var self = this;
            this.cellClassesWatcher = this.scope.$watchCollection('col.cellClasses', function(newValue, oldValue){
                var col:STColumn.Column = (<any>self.scope).col;
                if(!newValue){
                    if(col.isOptimizedProperty('cellClasses')){
                        self.cellClassesWatcher();
                    }
                    return;
                }
                var newClasses = self.arrayClasses(newValue || []);
                if (!oldValue || (oldValue === newValue)) {
                    self.addClasses(newClasses);
                } else if (!angular.equals(newValue,oldValue)) {
                    var oldClasses = self.arrayClasses(oldValue);
                    self.updateClasses(oldClasses, newClasses);
                }
                // Remove watcher if static
                if(col.isStaticProperty('cellClasses')){
                    self.cellClassesWatcher();
                }
            });
        }

        addCellClassesFunctionWatcher():void {
            var self = this;
            this.cellClassesFunctionWatcher = this.scope.$watch(function(scope:any){
                return scope.col.cellClassesFunction ? scope.col.cellClassesFunction(scope.row,scope.col,scope.tableConfig) : null;
            }, function(newValue, oldValue){
                var col:STColumn.Column = (<any>self.scope).col;
                if(!newValue){
                    if(col.isOptimizedProperty('cellClassesFunction')){
                        self.cellClassesFunctionWatcher();
                    }
                    return;
                }
                var newClasses = self.arrayClasses(newValue || []);
                if (!oldValue || (newValue === oldValue)) {
                    self.addClasses(newClasses);
                } else if (!angular.equals(newValue,oldValue)) {
                    var oldClasses = self.arrayClasses(oldValue);
                    self.updateClasses(oldClasses, newClasses);
                }
                // Remove watcher if static
                if(col.isStaticProperty('cellClassesFunction')){
                    self.cellClassesFunctionWatcher();
                }
            });
        }

        arrayClasses(classVal:any) {
            var classes = [],
                self = this;
            if (angular.isArray(classVal)) {
                angular.forEach(classVal, function(v) {
                    classes = classes.concat(self.arrayClasses(v));
                });
                return classes;
            } else if (angular.isString(classVal)) {
                return classVal.split(' ');
            } else if (angular.isObject(classVal)) {
                angular.forEach(classVal, function(v:any, k:any) {
                    if (!v) { return; }
                    classes = classes.concat(k.split(' '));
                });
                return classes;
            }
            return classVal;
        }

        updateClasses(oldClasses, newClasses) {
            var toAdd = this.arrayDifference(newClasses, oldClasses);
            var toRemove = this.arrayDifference(oldClasses, newClasses);
            this.addClasses(toAdd);
            this.removeClasses(toRemove);
        }

        arrayDifference(tokens1, tokens2) {
            var values = [];
            outer:
                for (var i = 0; i < tokens1.length; i++) {
                    var token = tokens1[i];
                    for (var j = 0; j < tokens2.length; j++) {
                        if (token == tokens2[j]) continue outer;
                    }
                    values.push(token);
                }
            return values;
        }

        addClasses(classes:any[]) {
            //var newClasses = digestClassCounts(classes, 1);
            //this.attrs.$addClass(classes);
            for(var i:number =0; i < classes.length; i++){
                var cssClass = classes[i];
                this.element.addClass(cssClass);
            }
        }

        removeClasses(classes) {
            //var newClasses = digestClassCounts(classes, -1);
            //this.attrs.$removeClass(classes);
            for(var i:number =0; i < classes.length; i++){
                var cssClass = classes[i];
                this.element.removeClass(cssClass);
            }
        }


        shouldUseCustomTemplate():boolean{
            var col:any = (<any>this.scope).col;
            return col && (col.cellTemplate || col.cellTemplateId);
        }

        getCustomTemplate(scope:angular.IScope):any{
            var col:STColumn.Column = (<any>scope).col;
            if(col.cellTemplateId){
                return this.getTemplateByCacheId(col.cellTemplateId);
            }
            /*
            if(col.templateUrl){
                return this.getTemplateByUrl(col.templateUrl);
            }
            */
            return col.cellTemplate;
        }

        applyDefaultTemplate():void {
            var tpl = this.$templateCache.get(STTemplates.STTpls.CELL_TPL_ID);
            this.optimizeAndApplyTemplate(tpl, this.scope);
        }

        optimizeTemplate(tpl:string, scope:angular.IScope):string {
            var col:STColumn.Column = (<any>scope).col;
            if(col.isStaticProperty('cellValue')){
                return this.$templateCache.get(STTemplates.STTpls.CELL_BO_TPL_ID);
            }
            return tpl;
        }

    }
}