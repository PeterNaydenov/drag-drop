function startDragging ( {task, dependencies, extractList}, data ) {
        let 
              { event  } = data
            , { target } = event
            , [ 
                  draggedTransperency
                , selection
                , selectStyle
                , dropStyle
                , filter
              ] = extractList ([
                                  'draggedTransperency'
                                , 'selection'
                                , 'selectStyle'
                                , 'dropStyle'
                                , 'filter'
                          ])
            , { hooks, fn, deps } = dependencies
            , validTarget = true
            , st = {}
            ;

        if ( filter )   validTarget = target.classList.contains ( filter )
        if ( !validTarget ) {
                task.done ({ success: false })
                return
            }

        if ( selection.length === 0 )   selection = [ target ]
        hooks.onStartDragging ({ event, selection, draggedTransperency, selectStyle, dependencies:deps })

        st.dragged        = target
        st.dragOffset     = { 
                                         x : event.offsetX
                                        ,y : event.offsetY
                                    }
        st.selection      = selection
        st.activeDropZone = fn.findDropZone ( target, dropStyle )
        task.done ({
                          success : true
                        , stateData : st
                })
} // startDragging func.



export { startDragging }


