/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="STTemplates.ts" />
angular.module('simpletable.table.tpls', [])
    .run(['$templateCache', function ($templateCache) {
        var tpls = new STTemplates.STTpls().getTemplates();
        _.forEach(tpls, function (pair) {
            $templateCache.put(pair.id, pair.tpl);
        });
    }]);
//# sourceMappingURL=STTemplatesModule.js.map