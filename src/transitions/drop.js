function drop ( task, dependencies, stateData, data ) {
    let 
          { event } = data
        , { activeDropZone, dragged, selection, dropStyle } = stateData
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
                hooks.onDrop ({ event, dropZone, dragged, selection, log })
                stateData.hasDrop = true
        }
    
    task.done ({
                      success : true
                    , stateData
            })
} // drop func.







export { drop }


