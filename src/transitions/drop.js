function drop ( task, dependencies, stateData, data ) {
    let 
          { event } = data
        , { activeDropZone, dragged, selection } = stateData
        , { hooks, fn } = dependencies
        , check = ( activeDropZone == event.target )
        , log   = []
        , targetList = fn.targetList ( event.target )
        ;
    event.preventDefault ()
    selection.forEach ( el => {
                    let 
                        sourceList = fn.targetList ( el.parentNode )
                      , item = {
                                    source : el.parentNode
                                  , target : event.target
                                  , el
                                  , targetList  // it's a function
                                  , sourceList  // it's a function
                              }
                      ;
                    log.push ( item )
            })
    if ( check )   hooks.onDrop ({ event, dragged, selection, log })
    task.done ({
                    success : true
            })
} // drop func.







export { drop }


