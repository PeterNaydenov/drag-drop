function endDragging ( task, dependencies, stateData, data ) {
    let
          { 
              activeDropZone
            , activeZoneStyle
            , selection
            , selectStyle
          } = stateData 
        ;
    activeDropZone.classList.remove ( activeZoneStyle )
    selection.forEach ( el => {
                            el.classList.remove ( selectStyle )
                            el.style.opacity = ''
                            if ( !el.style[0] )   el.removeAttribute ( 'style' )
                })

    stateData.activeDropZone = null
    stateData.selection = []
    task.done ({ 
                      success : true
                    , stateData
            })
} // endDragging func.



export { endDragging }


