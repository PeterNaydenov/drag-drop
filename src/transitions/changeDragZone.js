function changeDragZone ( {task, dependencies, extractList}, data ) {
    let 
          { event } = data
        , { fn    } = dependencies
        , [
              oldDropZone
            , dragged
            , activeZoneStyle
            , dropStyle 
          ] = extractList ([
                              'activeDropZone'
                            , 'dragged'
                            , 'activeZoneStyle'
                            , 'dropStyle' 
            ])
        , actZone = false
        ;
        
    if ( dragged.parentNode === event.target.parentNode ) {  
                        task.done ({ success : true })                    
                        return
        }
    actZone = fn.findDropZone ( event.target, dropStyle )
    if ( !actZone ) {
                    task.done ({ success : false })
                    return
        }
    if ( actZone ) {
                    if ( oldDropZone )   oldDropZone.classList.remove ( activeZoneStyle )
                    actZone.classList.add ( activeZoneStyle )
                    task.done ({
                                  success : true
                                , stateData : {
                                                    activeDropZone : actZone
                                            }
                            })
                    return
        }
    task.done ({ success : false })
} // changeDragZone func.



export { changeDragZone }


