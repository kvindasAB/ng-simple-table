'use strict';

angular.module('simpletable', [
    'simpletable.core',
    'simpletable.table',
    'simpletable.resizable',
    'simpletable.core.selection',
    'simpletable.uuid.util',
    'simpletable.reorder'
])
.value('version', '0.1');
