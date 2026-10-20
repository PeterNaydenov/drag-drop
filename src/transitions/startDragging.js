function startDragging ( {task, dependencies, extractList}, data ) {
        let 
              { event, target } = data
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

        if ( !selection.includes ( target ) ) {   // Dragging an element outside the selection: drag only that element
                selection.forEach ( el => el.classList.remove ( selectStyle ) )
                selection = [ target ]
            }
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


