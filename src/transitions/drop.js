function drop ( {task, dependencies, extractList}, data ) {
    let 
          { event } = data
        , [ activeDropZone, dragged, selection, dropStyle, dragOffset ] = extractList(['activeDropZone', 'dragged', 'selection', 'dropStyle', 'dragOffset'])
        , { hooks, fn, deps } = dependencies
        , log   = []
        , targetList = fn.targetList ( event.target )
        , dropZone = fn.findDropZone ( event.target, dropStyle)
        , hasDrop = false
        ;
    event.preventDefault ()
    if ( dropZone == activeDropZone ) {
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
    
    dragOffset = null
    task.done ({
                      success : true
                    , stateData : { hasDrop, dragOffset }
            })
} // drop func.







export { drop }


