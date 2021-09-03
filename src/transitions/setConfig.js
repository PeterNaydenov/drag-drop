function setConfig ( task, dependencies, stateData, data={} ) {
    let { hooks, config }= data;

    if ( !hooks )   hooks = {}
    if ( !config )   config = {}

    if ( config.onStartDragging )   hooks.onStartDragging = config.onStartDragging
    if ( config.onDrop          )   hooks.onDrop          = config.onDrop
    if ( config.onDropOut       )   hooks.onDropOut       = config.onDropOut

    if ( config.dropStyle       && (typeof config.dropStyle === 'string')               )   stateData.dropStyle           = config.dropStyle
    if ( config.draggedTransperency && (typeof config.draggedTransperency === 'number') )   stateData.draggedTransperency = config.draggedTransperency
    if ( config.activeZoneStyle && (typeof config.activeZoneStyle === 'string')         )   stateData.activeZoneStyle     = config.activeZoneStyle
    if ( config.selectStyle     && (typeof config.selectStyle === 'string')             )   stateData.selectStyle         = config.selectStyle
    if ( config.filter           && (typeof config.filter === 'string')                   )   stateData.filter               = config.filter
    
    if ( config.dependencies   )   stateData.dependencies = config.dependencies
    else                          stateData.dependencies = {}

    task.done ({ 
                  success : true 
                , stateData
                , response : hooks
            })
} // setConfig func.



export { setConfig }


