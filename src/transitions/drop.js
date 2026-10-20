function drop ( {task, dependencies, extractList}, data ) {
    let 
          { event } = data
        , [ activeDropZone, dragged, selection, dropStyle, dragOffset, reorder, indicator ] = extractList(['activeDropZone', 'dragged', 'selection', 'dropStyle', 'dragOffset', 'reorder', 'indicator'])
        , { hooks, fn, deps } = dependencies
        , log   = []
        , dropZone = fn.findDropZone ( event.target, dropStyle)
        , targetList = fn.targetList ( dropZone )   // event.target could be an element inside the drop zone
        , hasDrop = false
        , before  = null   // Insert dropped items before this node. Null -> append
        ;
    event.preventDefault ()
    if ( reorder && dropZone ) {
                const skip = [ ...selection, indicator ];
                if ( indicator && indicator.parentNode === dropZone ) {   // Placeholder: drop where it is
                            before = indicator.nextSibling
                            while ( before && skip.includes ( before ) )   before = before.nextSibling
                    }
                else   before = fn.findPosition ( dropZone, event.clientX, event.clientY, skip ).before
        }
    if ( indicator )   indicator.remove ()
    if ( dropZone && dropZone == activeDropZone ) {   // No drop zone -> 'endDragging' calls 'onDropOut'
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
                hooks.onDrop ({ event, dropZone, before, dragged, selection, log, dragOffset, dependencies:deps })
                hasDrop = true
        }
    
    task.done ({   // 'dragOffset' is reset by 'endDragging'
                      success : true
                    , stateData : { hasDrop, indicator: null }
            })
} // drop func.







export { drop }


