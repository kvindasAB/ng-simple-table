/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/lodash/lodash.d.ts" />
/// <reference path="SimpleTableReorderDrag.ts" />
/// <reference path="SimpleTableReorderDrop.ts" />
angular.module('simpletable.reorder', ['simpletable.uuid.util'])
    .directive('stTableDraggable', ['$timeout', 'SimpleTablePluginFactory', '$rootScope', 'simpletableuuid',
        function($timeout, SimpleTablePluginFactory, $rootScope, uuid){
            return {
                require: '^stTable',
                link: function(scope, element, attrs, parentCtrl){
                    return new SimpleTableReorder.SimpleTableReorderDrag($rootScope, scope, element, attrs);
                    /*angular.element(element).attr("draggable", "true");

                    var id = angular.element(element).attr("id");

                    if(!id){
                        id = uuid.new();
                        angular.element(element).attr("id", id);
                    }
                    element.bind("dragstart", function(event){
                        event.dataTransfer.setData('text', id);
                        $rootScope.$emit("SIMPLE-TABLE-DRAG-START");
                    });

                    element.bind("dragend", function(event){
                        $rootScope.$emit("SIMPLE-TABLE-DRAG-END");
                    });*/
                }
            };
        }
    ])
    .directive('stTableDropTarget', ['$timeout', 'SimpleTablePluginFactory', '$rootScope', 'simpletableuuid',
        function ($timeout, SimpleTablePluginFactory, $rootScope, uuid) {
            return {
                require: '^stTable',
                restrict: 'A',
                scope: {
                    onSymbolDrop: '&'
                },
                link: function(scope, element, attrs, controller){
                    return new SimpleTableReorder.SimpleTableReorderDrop($rootScope, scope, element, attrs);
                    /*var id = angular.element(element).attr("id");
                    if(!id){
                        id = uuid.new();
                        angular.element(element).attr("id", id);
                    }

                    element.bind("dragover", function(event){
                        if(event.preventDefault){
                            event.preventDefault(); // Necessary. Allows us to drop.
                        }

                        event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                        return false;
                    });

                    element.bind("dragenter", function(event){
                        // this / e.target is the current hover target.
                        angular.element(event.target).addClass('simple-table-over');
                    });

                    element.bind("dragleave", function(event){
                        angular.element(event.target).removeClass('simple-table-over');  // this / e.target is previous target element.
                    });

                    element.bind("drop", function(event){
                        if(event.preventDefault){
                            event.preventDefault(); // Necessary. Allows us to drop.
                        }

                        if(event.stopPropagation){
                            event.stopPropagation(); // Necessary. Allows us to drop.
                        }
                        var data = event.dataTransfer.getData("text");
                        //var src = document.getElementById(data);
                        var src = angular.element(data);
                        var srcData:any = angular.element(src)[0];
                        var oldIndex = srcData.cellIndex;

                        var dest:any = angular.element(event.target)[0];
                        var newIndex = dest.cellIndex;
                        var columns:any = scope.$parent.tableConfig.columns;

                        var dataColumn = columns[oldIndex];
                        columns.splice(oldIndex, 1);
                        if(newIndex === columns.length){
                            columns[newIndex] = dataColumn;
                        }else{
                            columns.splice(newIndex, 0, dataColumn);
                        }

                        angular.element(event.target).removeClass('simple-table-over');

                        scope.onSymbolDrop({
                            //dragEl: data,
                            //dropEl: id//,
                            //portfolio: portfolio,
                            //symbol: symbol
                        });
                        scope.$apply();
                    });

                    $rootScope.$on("SIMPLE-TABLE-DRAG-START", function () {
                        //var element = document.getElementById(id);
                        //angular.element(element).addClass("simple-table-target");
                    });

                    $rootScope.$on("SIMPLE-TABLE-DRAG-END", function () {
                        //var element = document.getElementById(id);
                        //angular.element(element).removeClass("simple-table-target");
                        //angular.element(element).removeClass("simple-table-over");
                    });*/
                }
            };
        }
    ]);