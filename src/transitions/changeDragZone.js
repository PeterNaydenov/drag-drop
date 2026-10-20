function changeDragZone ( {task, dependencies, extractList}, data ) {
    let 
          { event } = data
        , { fn    } = dependencies
        , [
              oldDropZone
            , activeZoneStyle
            , dropStyle
          ] = extractList ([
                              'activeDropZone'
                            , 'activeZoneStyle'
                            , 'dropStyle'
            ])
        , actZone = fn.findDropZone ( event.target, dropStyle )   // false when outside of drop zones
        ;

    if ( oldDropZone && oldDropZone !== actZone )   oldDropZone.classList.remove ( activeZoneStyle )
    if ( actZone )   actZone.classList.add ( activeZoneStyle )
    task.done ({
                  success : true
                , stateData : {
                                    activeDropZone : actZone || null
                            }
            })
} // changeDragZone func.



export { changeDragZone }


