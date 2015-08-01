var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../tpl/STTemplates.ts" />
/// <reference path="../column/STColumn.ts" />
var STCellUI;
(function (STCellUI) {
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell() {
            _super.apply(this, arguments);
            this.cellClassesFirstRun = true;
        }
        Cell.prototype.init = function () {
            if (this.shouldUseCustomTemplate()) {
                this.validateCustomTemplate();
                return;
            }
            this.applyDefaultTemplate();
            this.addWatchers();
        };
        Cell.prototype.addWatchers = function () {
            this.addCellIdWatcher();
            this.addCellClassesWatcher();
        };
        Cell.prototype.addCellIdWatcher = function () {
            var self = this;
            this.cellIdWatcher = this.scope.$watch('col.cellIdFunction', function (oldValue, newValue) {
                var col = self.scope.col;
                if (!newValue) {
                    if (col.isStaticProperty('cellId')) {
                        self.cellIdWatcher();
                    }
                    return;
                }
                var value = newValue(self.scope.row, self.scope.col, self.scope.tableConfig);
                self.element.attr('id', value);
                if (col.isStaticProperty('cellId')) {
                    self.cellIdWatcher();
                }
            });
        };
        Cell.prototype.addCellClassesWatcher = function () {
            var self = this;
            this.cellClassesWatcher = this.scope.$watch('col.cellClasses', function (oldValue, newValue) {
                debugger;
                var col = self.scope.col;
                if (!newValue) {
                    if (col.isStaticProperty('cellClasses')) {
                        self.cellClassesWatcher();
                    }
                    return;
                }
                var newClasses = self.arrayClasses(newValue || []);
                if (!oldValue || self.cellClassesFirstRun) {
                    self.addClasses(newClasses);
                }
                else if (!angular.equals(newValue, oldValue)) {
                    var oldClasses = self.arrayClasses(oldValue);
                    self.updateClasses(oldClasses, newClasses);
                }
                self.cellClassesFirstRun = false;
                if (col.isStaticProperty('cellClasses')) {
                    self.cellClassesWatcher();
                }
            });
        };
        Cell.prototype.arrayClasses = function (classVal) {
            var classes = [], self = this;
            if (angular.isArray(classVal)) {
                angular.forEach(classVal, function (v) {
                    classes = classes.concat(self.arrayClasses(v));
                });
                return classes;
            }
            else if (angular.isString(classVal)) {
                return classVal.split(' ');
            }
            else if (angular.isObject(classVal)) {
                angular.forEach(classVal, function (v, k) {
                    if (!v) {
                        return;
                    }
                    if (angular.isFunction(v)) {
                        var res = classVal(this.scope.row, this.scope.col, this.scope.tableConfig);
                        if (!res) {
                            return;
                        }
                    }
                    classes = classes.concat(k.split(' '));
                });
                return classes;
            }
            else if (angular.isFunction(classVal)) {
                var res = classVal(this.scope.row, this.scope.col, this.scope.tableConfig);
                if (res) {
                    classes.push(res);
                }
                return classes;
            }
            return classVal;
        };
        Cell.prototype.updateClasses = function (oldClasses, newClasses) {
            var toAdd = this.arrayDifference(newClasses, oldClasses);
            var toRemove = this.arrayDifference(oldClasses, newClasses);
            this.addClasses(toAdd);
            this.removeClasses(toRemove);
        };
        Cell.prototype.arrayDifference = function (tokens1, tokens2) {
            var values = [];
            outer: for (var i = 0; i < tokens1.length; i++) {
                var token = tokens1[i];
                for (var j = 0; j < tokens2.length; j++) {
                    if (token == tokens2[j])
                        continue outer;
                }
                values.push(token);
            }
            return values;
        };
        Cell.prototype.addClasses = function (classes) {
            for (var i = 0; i < classes.length; i++) {
                var cssClass = classes[i];
                this.element.addClass(cssClass);
            }
        };
        Cell.prototype.removeClasses = function (classes) {
            for (var i = 0; i < classes.length; i++) {
                var cssClass = classes[i];
                this.element.removeClass(cssClass);
            }
        };
        Cell.prototype.shouldUseCustomTemplate = function () {
            var col = this.scope.col;
            return col && (col.cellTemplate || col.cellTemplateId);
        };
        Cell.prototype.getCustomTemplate = function (scope) {
            var col = scope.col;
            if (col.cellTemplateId) {
                return this.getTemplateByCacheId(col.cellTemplateId);
            }
            return col.cellTemplate;
        };
        Cell.prototype.applyDefaultTemplate = function () {
            var tpl = this.$templateCache.get(STTemplates.STTpls.CELL_TPL_ID);
            this.optimizeAndApplyTemplate(tpl, this.scope);
        };
        Cell.prototype.optimizeTemplate = function (tpl, scope) {
            var col = scope.col;
            if (col.isStaticProperty('cellValue')) {
                return this.$templateCache.get(STTemplates.STTpls.CELL_BO_TPL_ID);
            }
            return tpl;
        };
        return Cell;
    })(STCore.BaseComponentUI);
    STCellUI.Cell = Cell;
})(STCellUI || (STCellUI = {}));
//# sourceMappingURL=STCellUI.js.map