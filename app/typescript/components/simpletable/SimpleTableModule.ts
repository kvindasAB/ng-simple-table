angular.module('simpletable',
    [
        'simpletable.table',
        'simpletable.table.tpls',
        'simpletable.table.header',
        'simpletable.table.column',
        'simpletable.table.body',
        'simpletable.table.row',
        'simpletable.table.cell',
        'simpletable.factory',
        'simpletable.reorder',
        'simpletable.resizable',
        'simpletable.uuid.util'

    ])
    .value('version', '0.2');

