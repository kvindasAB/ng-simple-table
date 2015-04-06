/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/lodash/lodash.d.ts" />
'use strict';
angular.module('simpletable.reorder', ['simpletable.uuid.util'])
    .directive('stTableDraggable', ['$timeout', 'SimpleTablePluginFactory', '$rootScope', 'simpletableuuid',
        function($timeout, SimpleTablePluginFactory, $rootScope, uuid){
            return {
                require: '^stTable',
                link: function(scope, element, attrs, parentCtrl){
                    angular.element(element).attr("draggable", "true");

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
                    });
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
                    var id = angular.element(element).attr("id");
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
                        var src = document.getElementById(data);
                        var srcData:any = angular.element(src)[0];
                        var oldIndex = srcData.cellIndex;

                        var dest:any = angular.element(event.target)[0];
                        var newIndex = dest.cellIndex;
                        var columns = scope.$parent.tableConfig.columns;

                        //Se necesita lodash
                        //var data = _.pullAt(columns, oldIndex);

                        angular.element(event.target).removeClass('simple-table-over');

                        scope.onSymbolDrop({
                            //dragEl: data,
                            //dropEl: id//,
                            //portfolio: portfolio,
                            //symbol: symbol
                        });
                    });

                    $rootScope.$on("SIMPLE-TABLE-DRAG-START", function () {
                        //var element = document.getElementById(id);
                        //angular.element(element).addClass("simple-table-target");
                    });

                    $rootScope.$on("SIMPLE-TABLE-DRAG-END", function () {
                        //var element = document.getElementById(id);
                        //angular.element(element).removeClass("simple-table-target");
                        //angular.element(element).removeClass("simple-table-over");
                    });
                }
            };
        }
    ]);