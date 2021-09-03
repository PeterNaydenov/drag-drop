function drop ( task, dependencies, stateData, data ) {
    let 
          { event } = data
        , { activeDropZone, dragged, selection, dropStyle, dragOffset, dependencies:deps } = stateData
        , { hooks, fn } = dependencies
        , log   = []
        , targetList = fn.targetList ( event.target )
        , dropZone = fn.findDropZone ( event.target, dropStyle)
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
                stateData.hasDrop = true
        }
    
    stateData.dragOffset = null
    task.done ({
                      success : true
                    , stateData
            })
} // drop func.







export { drop }


