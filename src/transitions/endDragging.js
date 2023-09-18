function endDragging ( {task, dependencies, extractList}, data ) {
    let
          { hooks, fn, deps } = dependencies
        , [
                activeDropZone
              , activeZoneStyle
              , dragged
              , selection
              , selectStyle
              , hasDrop
          ] = extractList ([
                                  'activeDropZone'
                                , 'activeZoneStyle'
                                , 'dragged'
                                , 'selection'
                                , 'selectStyle'
                                , 'hasDrop'
                                , 'dependencies'
                      ])
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
              hooks.onDropOut ({event, dropZone, dragged, selection, log, dependencies:deps })
        }
    activeDropZone.classList.remove ( activeZoneStyle )
    selection.forEach ( el => {
                            el.classList.remove ( selectStyle )
                            el.style.opacity = ''
                            if ( !el.style[0] )   el.removeAttribute ( 'style' )
                })

    activeDropZone = null
    selection      = []
    hasDrop        = false
    
    task.done ({ 
                      success : true
                    , stateData : { activeDropZone, selection, hasDrop }
            })
} // endDragging func.



export { endDragging }


