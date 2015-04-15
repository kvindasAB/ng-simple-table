/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/lodash/lodash.d.ts" />
/// <reference path="SimpleTableReorderDrag.ts" />
/// <reference path="SimpleTableReorderDrop.ts" />
angular.module('simpletable.reorder', ['simpletable.uuid.util'])
    .directive('stTableDraggable', ['$timeout', '$rootScope', 'simpletableuuid',
        function($timeout, $rootScope, uuid){
            return {
                require: '^stTable',
                link: function(scope, element, attrs, parentCtrl){
                    return new SimpleTableReorder.SimpleTableReorderDrag($rootScope, scope, element, attrs);
                }
            };
        }
    ])
    .directive('stTableDropTarget', ['$timeout', '$rootScope', 'simpletableuuid',
        function ($timeout, $rootScope, uuid) {
            return {
                require: '^stTable',
                restrict: 'A',
                scope: {
                    onSymbolDrop: '&'
                },
                link: function(scope, element, attrs, controller){
                    return new SimpleTableReorder.SimpleTableReorderDrop($rootScope, scope, element, attrs);
                }
            };
        }
    ]);