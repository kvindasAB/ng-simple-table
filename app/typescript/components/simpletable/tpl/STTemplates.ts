module STTemplates {

    /**
     * SimpleTable default templates
     */
    export class STTpls {

        static CELL_TPL:string      = "";
        static CELL_BO_TPL:string   = "";
        static ROW_TPL:string       = "<td ng-repeat='col in tableConfig.columns' st-table-cell ng-if='col.active' ></td>";
        static BODY_TPL:string      = "<tr bindonce ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
                                      "  ng-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' " +
                                      "  st-table-row >" +
                                      "</tr>";
        static BODY_VS_TPL:string   = "<tr bindonce ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " +
                                      "  sf-virtual-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' " +
                                      "  st-table-row >" +
                                      "</tr>";
        static COLUMN_TPL:string    = "{{hcol.title}}<div st-table-resizable-handler class='table-header-cursor-container'></div>";
        static HEADER_TPL:string    = "<tr>" +
                                      "  <th id='{{hcol.id}}' class='table-header' " +
                                      "   ng-repeat='hcol in tableConfig.columns track by hcol.id' " +
                                      "   ng-class='hcol.headerClass' ng-if='hcol.active' " +
                                      "   ng-style='{\"height\":tableConfig.headerHeight, \"min-width\":hcol.style.minWidth, \"width\":hcol.style.width}' " +
                                      "   st-table-drop-target='true' st-table-draggable='true' st-table-column>" +
                                      "  </th>" +
                                      "</tr>";
        static TABLE_TPL:string     = "<div ng-style='{width:tableConfig.tableWidth}'>" +
                                      "  <table ng-class='tableConfig.tableClasses' ng-style='{width:tableConfig.tableWidth}'>" +
                                      "    <thead st-table-header>" +
                                      "    </thead>" +
                                      "    <tbody st-table-body virtual-scroll='{{tableConfig.virtualScroll}}' >" +
                                      "    </tbody>" +
                                      "  </table>" +
                                      "</div>";

        static CELL_TPL_ID:string       = 'stTableCellTpl.html';
        static CELL_BO_TPL_ID:string    = 'stTableCellBOTpl.html';
        static ROW_TPL_ID:string        = 'stTableRowTpl.html';
        static BODY_TPL_ID:string       = 'stTableBodyTpl.html';
        static BODY_VS_TPL_ID:string    = 'stTableBodyVSTpl.html';
        static COLUMN_TPL_ID:string     = 'stTableColumnTpl.html';
        static HEADER_TPL_ID:string     = 'stTableHeaderTpl.html';
        static TABLE_TPL_ID:string      = 'stTableTpl.html';

        static CELL_TPL_PAIR:any        = {id: STTpls.CELL_TPL_ID,     tpl: STTpls.CELL_TPL};
        static CELL_BO_TPL_PAIR:any     = {id: STTpls.CELL_BO_TPL_ID,  tpl: STTpls.CELL_BO_TPL};
        static ROW_TPL_PAIR:any         = {id: STTpls.ROW_TPL_ID,      tpl: STTpls.ROW_TPL};
        static BODY_TPL_PAIR:any        = {id: STTpls.BODY_TPL_ID,     tpl: STTpls.BODY_TPL};
        static BODY_VS_TPL_PAIR:any     = {id: STTpls.BODY_VS_TPL_ID,  tpl: STTpls.BODY_VS_TPL};
        static COLUMN_TPL_PAIR:any      = {id: STTpls.COLUMN_TPL_ID,   tpl: STTpls.COLUMN_TPL};
        static HEADER_TPL_PAIR:any      = {id: STTpls.HEADER_TPL_ID,   tpl: STTpls.HEADER_TPL};
        static TABLE_TPL_PAIR:any       = {id: STTpls.TABLE_TPL_ID,    tpl: STTpls.TABLE_TPL};

        getTemplates() {
            return [STTpls.TABLE_TPL_PAIR, STTpls.HEADER_TPL_PAIR, STTpls.COLUMN_TPL_PAIR, STTpls.BODY_TPL_PAIR, STTpls.BODY_VS_TPL_PAIR, STTpls.ROW_TPL_PAIR, STTpls.CELL_TPL_PAIR, STTpls.CELL_BO_TPL_PAIR];
        }

    }
}