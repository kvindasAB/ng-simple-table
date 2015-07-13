TODO List
========

- Directive refactoring - Make every piece a different directive, headers, rows, columns.
- Column refactoring
- External template functionality refactoring
- Auto checkbox column
- Inline edition
- Responsive columns adapting via resolution and functionality.
- Responsive functionality ex. on resize or drag.
- II - Multi Column sort
- Save state feature
 
-- Issues

Columns should be active by default, and inactive only if specified.
Columns seems to be added by pieces, which forces the re-rendering of the table
Resize fixed being applied by default, while should be relative by default.
Relative resize should be called percentage
Rendering is very slow, seems like adding columns manually
If no resizable handler is defined, the table generate issues




## Completed

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
