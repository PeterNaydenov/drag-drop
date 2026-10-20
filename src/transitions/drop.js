function drop ( {task, dependencies, extractList}, data ) {
    let 
          { event } = data
        , [ activeDropZone, dragged, selection, dropStyle, dragOffset ] = extractList(['activeDropZone', 'dragged', 'selection', 'dropStyle', 'dragOffset'])
        , { hooks, fn, deps } = dependencies
        , log   = []
        , dropZone = fn.findDropZone ( event.target, dropStyle)
        , targetList = fn.targetList ( dropZone )   // event.target could be an element inside the drop zone
        , hasDrop = false
        ;
    event.preventDefault ()
    if ( dropZone && dropZone == activeDropZone ) {   // No drop zone -> 'endDragging' calls 'onDropOut'
                selection.forEach ( el => {
                              let 
                                  sourceList = fn.targetList ( el.parentNode )
                                , item = {
                                              source : el.parentNode
                                            , target : dropZone
                                            , el
                                            , targetList  // it's a function
                                            , sourceList  // it's a function
                                        }
                                ;
                              log.push ( item )
                      })
                hooks.onDrop ({ event, dropZone, dragged, selection, log, dragOffset, dependencies:deps })
                hasDrop = true
        }
    
    task.done ({   // 'dragOffset' is reset by 'endDragging'
                      success : true
                    , stateData : { hasDrop }
            })
} // drop func.







export { drop }


