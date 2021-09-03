function startDragging ( task, dependencies, stateData, data ) {
        let 
              { event  } = data
            , { target } = event
            , { draggedTransperency, selection, selectStyle, dropStyle, filter, dependencies:deps } = stateData
            , { hooks, fn } = dependencies
            , validTarget = true
            ;

        if ( filter )   validTarget = target.classList.contains ( filter )
        if ( !validTarget ) {
                task.done ({ success: false })
                return
            }

        if ( selection.length === 0 )   selection = [ target ]
        hooks.onStartDragging ({ event, selection, draggedTransperency, selectStyle, dependencies:deps })

        stateData.dragged        = target
        stateData.dragOffset     = { 
                                         x : event.offsetX
                                        ,y : event.offsetY
                                    }
        stateData.selection      = selection
        stateData.activeDropZone = fn.findDropZone ( target, dropStyle )
        task.done ({
                          success : true
                        , stateData
                })
} // startDragging func.



export { startDragging }


