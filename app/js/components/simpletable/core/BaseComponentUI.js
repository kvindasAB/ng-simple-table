/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="ISimpleTablePlugin.ts" />
/// <reference path="IDisposable.ts" />
var STCore;
(function (STCore) {
    var BaseComponentUI = (function () {
        function BaseComponentUI() {
        }
        BaseComponentUI.prototype.setServices = function ($compile, $templateCache, $templateRequest) {
            this.$compile = $compile;
            this.$templateCache = $templateCache;
            this.$templateRequest = $templateRequest;
        };
        BaseComponentUI.prototype.link = function (scope, element, attrs, simpleTable) {
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.simpleTable = simpleTable;
            this.scope.$on('$destroy', this.dispose);
        };
        BaseComponentUI.prototype.validateCustomTemplate = function () {
            if (!this.shouldUseCustomTemplate()) {
                return;
            }
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        };
        BaseComponentUI.prototype.shouldUseCustomTemplate = function () {
            return false;
        };
        BaseComponentUI.prototype.getCustomTemplate = function (scope) {
            return null;
        };
        BaseComponentUI.prototype.getTemplateByCacheId = function (tplId) {
            return this.$templateCache.get(tplId);
        };
        BaseComponentUI.prototype.getTemplateByUrl = function (tplUrl) {
            var tpl = this.$templateCache.get(tplUrl);
            if (tpl) {
                return tpl;
            }
            return this.$templateRequest(tplUrl);
        };
        BaseComponentUI.prototype.applyTemplate = function (tpl, scope) {
            if (!tpl) {
                return;
            }
            var tpl = this.getCustomTemplate(this.scope);
            this.element.html(tpl);
            this.$compile(this.element.contents())(this.scope);
        };
        BaseComponentUI.prototype.dispose = function () {
            delete this.scope;
            delete this.element;
            delete this.attrs;
            delete this.simpleTable;
            delete this.$compile;
            delete this.$templateCache;
            delete this.$templateRequest;
        };
        return BaseComponentUI;
    })();
    STCore.BaseComponentUI = BaseComponentUI;
})(STCore || (STCore = {}));
//# sourceMappingURL=BaseComponentUI.js.map