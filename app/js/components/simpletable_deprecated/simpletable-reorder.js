'use strict';
angular.module('simpletable.reorder', ['simpletable.uuid.util'])
    /*.service('SimpleTableReorderDirectiveFactory', ['$log', function($log){
        var SimpleTableReorderDirective = function(scope, element, attrs){
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.$log = $log;
            this.parentCtrl = null;
            this.initComplete = false;
        };

        SimpleTableReorderDirective.prototype.registerPlugin = function(){
        };

        SimpleTableReorderDirective.prototype.onRegistered = function(){
            this.init();
        };

        SimpleTableReorderDirective.prototype.init = function(){
            this.initComplete = true;
        };

        SimpleTableReorderDirective.prototype.isInitialized = function(){
            return this.initComplete;
        };

        //******************
        // FACTORY INSTANCE
        //******************
        var Factory = function(){
        };
        Factory.prototype.newInstance = function($scope, $element, $attrs){
            return new SimpleTableReorderDirective($scope, $element, $attrs);
        };
        return new Factory();
    }])*/
    .directive('stTableDraggable', ['$log', '$rootScope', 'simpletableuuid',
        function($log, $rootScope, uuid){
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
    }])
    .directive('stTableDropTarget', ['$rootScope', 'simpletableuuid', function ($rootScope, uuid) {
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
                    //var dest = document.getElementById(id);
                    //var src = document.getElementById(data);
                    var newIndex = angular.element(event.target)[0].cellIndex;
                    //var oldIndex = angular.element(src)[0].cellIndex;
                    var columns = angular.element(event.target).scope().tableConfig.columns;
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
    }])
;