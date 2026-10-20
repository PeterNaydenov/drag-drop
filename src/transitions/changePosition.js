function changePosition ({ task, dependencies, extractList }, data ) {   // Moves the drop position indicator. Runs on 'dragover'
    let
          { event } = data
        , { fn    } = dependencies
        , [
              reorder
            , indicator
            , dragged
            , selection
            , dropStyle
            , placeholderStyle
          ] = extractList ([
                              'reorder'
                            , 'indicator'
                            , 'dragged'
                            , 'selection'
                            , 'dropStyle'
                            , 'placeholderStyle'
            ])
        , zone = reorder ? fn.findDropZone ( event.target, dropStyle ) : false
        ;

    if ( !reorder ) {   // Reorder is not enabled
                task.done ({ success : false })
                return
        }

    if ( !zone ) {   // Outside of drop zones: hide the indicator
                if ( indicator )   indicator.remove ()
                task.done ({ success : true, stateData : { indicator: null }})
                return
        }

    const
          skip     = [ ...selection, indicator ]
        , position = fn.findPosition ( zone, event.clientX, event.clientY, skip )
        ;
    indicator = fn.drawIndicator ({ reorder, indicator, zone, position, dragged, placeholderStyle, skip })
    task.done ({
                  success : true
                , stateData : { indicator }
            })
} // changePosition func.



export { changePosition }


