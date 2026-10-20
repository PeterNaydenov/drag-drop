function setConfig ( {task}, data={} ) {
    let { hooks, config }= data;
    let st = {}

    hooks = { ...hooks }   // Copy. Don't modify the default hooks shared by all instances
    if ( !config )   config = {}

    if ( config.onStartDragging )   hooks.onStartDragging = config.onStartDragging
    if ( config.onDrop          )   hooks.onDrop          = config.onDrop
    if ( config.onDropOut       )   hooks.onDropOut       = config.onDropOut

    if ( config.dropStyle       && (typeof config.dropStyle === 'string')               )   st.dropStyle           = config.dropStyle
    if ( typeof config.draggedTransperency === 'number'                                )   st.draggedTransperency = config.draggedTransperency
    if ( config.activeZoneStyle && (typeof config.activeZoneStyle === 'string')         )   st.activeZoneStyle     = config.activeZoneStyle
    if ( config.selectStyle     && (typeof config.selectStyle === 'string')             )   st.selectStyle         = config.selectStyle
    if ( config.filter           && (typeof config.filter === 'string')                   )   st.filter               = config.filter

    task.done ({ 
                  success : true 
                , stateData: st
                , response : hooks
            })
} // setConfig func.



export { setConfig }


