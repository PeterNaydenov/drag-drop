function startDragging ( task, dependencies, stateData, data ) {
        let 
              { event } = data
            , { draggedTransperency, selection, selectStyle, dropStyle } = stateData
            , { hooks, fn } = dependencies
            ;

        if ( selection.length === 0                                 )   selection = [ event.target ]
        hooks.onStartDragging ({ event, selection, draggedTransperency, selectStyle })

        stateData.dragged        = event.target
        stateData.selection      = selection
        stateData.activeDropZone = fn.findDropZone ( event.target, dropStyle )
        task.done ({
                          success : true
                        , stateData
                })
} // startDragging func.



export { startDragging }


