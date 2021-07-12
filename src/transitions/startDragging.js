function startDragging ( task, dependencies, stateData, data ) {
        let 
              { event } = data
            , { draggedTransperency, selection, selectStyle } = stateData
            , { hooks } = dependencies
            ;

        // if ( selection.length === 1 && selection[0] != event.target )   selection = []
        if ( selection.length === 0                                 )   selection = [ event.target ]
        hooks.onStartDragging ({ event, selection, draggedTransperency, selectStyle })

        stateData.dragged        = event.target
        stateData.selection      = selection
        stateData.activeDropZone = event.target.parentNode
        task.done ({
                          success : true
                        , stateData
                })
} // startDragging func.



export { startDragging }


