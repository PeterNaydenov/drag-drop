function changeDragZone ( task, dependencies, stateData, data ) {
    let 
          { event } = data
        , { fn    } = dependencies
        , { 
              activeDropZone : oldDropZone
            , dragged
            , activeZoneStyle
            , dropStyle 
            } = stateData
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
                    oldDropZone.classList.remove ( activeZoneStyle )
                    actZone.classList.add ( activeZoneStyle )
                    stateData.activeDropZone = actZone
                    task.done ({
                                  success : true
                                , stateData
                            })
                    return
        }
    task.done ({ success : false })
} // changeDragZone func.



export { changeDragZone }


