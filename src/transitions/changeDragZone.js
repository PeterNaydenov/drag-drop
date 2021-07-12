function changeDragZone ( task, dependencies, stateData, data ) {
    let 
          { event } = data
        , { 
              activeDropZone
            , activeZoneStyle
            , dropStyle 
            } = stateData
        , inActiveZone   = ( event.target == activeDropZone )
        , inInternalItem = ( event.target.parentNode == activeDropZone )
        , hasDropStyle   = ( event.target.classList.contains(dropStyle))
        ;

    if ( inActiveZone || inInternalItem ) {
                    task.done ({ success : false })
                    return
        }
    if ( hasDropStyle ) {
                    activeDropZone.classList.remove ( activeZoneStyle )
                    event.target.classList.add ( activeZoneStyle )
                    stateData.activeDropZone = event.target
                    task.done ({
                                  success : true
                                , stateData
                            })
                    return
        }
    task.done ({ success : false })
} // changeDragZone func.



export { changeDragZone }


