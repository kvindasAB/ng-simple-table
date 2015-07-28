# NG Simple Table
========

## Documentation

## Lifecycle

Component lifecycle is the following.

 - Process table config
    - Create tableConfig object based on json provided as param
    - Create columns. See column lifecycle below
    - Plugins
       - Init default plugins
       - Init rest of plugins
       - Init listeners
    - Apply sizing/resizing
    - Process data
    - Rendering

## Columns

Each Column object is created based on a raw json object.
After creation it is sync with the json.
Methods syncFromData copies information from json to object.
After columns creation the raw jsons are replaced by Column objects
Columns are handled by ColumnManager

## Managers

### ColumnManager

### SortManager

### FilterManager



