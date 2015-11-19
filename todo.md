TODO List
========


V1.0

Optimization and rendering improvements - Phase1:

    - cellId
    - cellValue
    - cellClasses
    - active
    - headerClasses
    
Virtualization. Phase2 - keeping header.
Improve listening to resize via code listener instead of additional directive.
Drag and Drop - Enable/Disable the feature
Resizable Columns - Enable/Disable the feature
Sortable columns / Enable disable sorting

Save state feature.

-- Issues

Columns seems to be added by pieces, which forces the re-rendering of the table, occurs when drag-drop plugin not initialized
Rendering is very slow, seems like adding columns manually - Occurs when drag-drop plugin not initialized
If no resizable handler is defined, the table generate issues.
Resize fixed being applied by default, while should be relative by default.
Relative resize should be called percentage.


V2.0

Fix issue where table rendering do not grab the whole area - DONE
TableConfig refactoring and modeling on proper object. - DONE
TableConfig defaults as resize management, headerHeight, etc. - DONE
Cell getValue and getValue functions. - DONE
Cell selection.
One time binding for columns - Review this with virtualization.
- II - Multi Column sort 
- II - Inline edition
- II - Save state feature
- Auto checkbox column


V3.0

- Allow custom templates to be external files. 
- External template functionality refactoring
- Responsive columns adapting via resolution and functionality.
- Responsive functionality ex. on resize or drag.

## Completed

Virtualization. Phase1 - DONE
- Column refactoring - DONE
- Columns should be active by default, and inactive only if specified. - DONE
- Dispose ComponentUI objects on scope destroy. - DONE
- Reenable (row, cell, column) external templates mechanism - DONE
- Centralize UI Objects and template management - DONE
- Integrate templates templateCache - DONE
- Directive refactoring - Make every piece a different directive, headers, rows, columns.
    - Columns - DONE
    - Rows - DONE
    - Cells - DONE
- Simplify parts (row, cell, column) templates by adding listeners to code instead of template code. - DONE
- Sort
   - Create directive per header - NOT REQUIRED 
   - Communicate child directives with parent directive. - NOT REQUIRED
   - Listen to click - DONE
   - Sort data accordingly - DONE
   - Issue with Sort reapply - DONE
   - Get sort externally - DONE
   - Column custom sort - DONE
   - Set sort externally - DONE
   
- Resize functionality
   - Resize functionality type FitToScreen - DONE
   - Resize functionality type Static - DONE
- Drag and drop functionality - DONE



- Filter - String or Function - DONE
- Selection - DONE
- Plugin architecture -- DONE
- Communicate API to controller via event -- DONE

- Selection Feature
    - Single - DONE
    - Multiple - DONE
    - Allow to externally set the selection - DONE
    - Allow to externally retrieve the selection - DONE
    - Keep selection on data changed- DONE 
