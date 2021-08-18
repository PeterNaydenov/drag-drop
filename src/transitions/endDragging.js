function endDragging ( task, dependencies, stateData, data ) {
    let
          { hooks, fn } = dependencies
        , { 
              activeDropZone
            , activeZoneStyle
            , dragged
            , selection
            , selectStyle
            , hasDrop
          } = stateData
        , { event } = data 
        , log = []
        ;
        
    if ( !hasDrop ) {
                let dropZone = false;
                selection.forEach ( el => {
                            let 
                                sourceList = fn.targetList ( el.parentNode )
                              , item = {
                                            source : el.parentNode
                                          , target : false
                                          , el
                                          , sourceList  // it's a function
                                      }
                              ;
                            log.push ( item )
                    })
              hooks.onDropOut ({event, dropZone, dragged, selection, log })
        }
    activeDropZone.classList.remove ( activeZoneStyle )
    selection.forEach ( el => {
                            el.classList.remove ( selectStyle )
                            el.style.opacity = ''
                            if ( !el.style[0] )   el.removeAttribute ( 'style' )
                })

    stateData.activeDropZone = null
    stateData.selection      = []
    stateData.hasDrop        = false
    
    task.done ({ 
                      success : true
                    , stateData
            })
} // endDragging func.



export { endDragging }


