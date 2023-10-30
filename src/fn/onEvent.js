'use strict'
// *** 

function getEventFunctions ( dragDrop, ignoreSelect ) {
    return {
          mouseDown: event => {
                if ( event.target.draggable              )   return
                if ( ignoreSelect && ignoreSelect(event) )   return
                dragDrop.update ( 'select', {event})
            }
        
        , mouseUp: event  => {
                            if ( event.target.draggable ) {
                                        if      ( event.altKey    )   dragDrop.update ( 'removeItem'  , {event} )
                                        else if ( event.shiftKey  )   dragDrop.update ( 'addItem'     , {event} )
                                        else                          dragDrop.update ( 'newSelection', {event} )
                                        return
                                }
                            dragDrop.update ( 'end', {event})
                    } 
        , mouseMove : event => {
                            dragDrop.update ( 'move', {event})
                    }

        , dragStart : event => {
                            dragDrop.update ( 'drag', {event})
                    }
        , dragEnd   : event => {
                            dragDrop.ignoreCachedUpdates ()
                            dragDrop.update ( 'end', {event})
                    }
        , dragOver  : event => event.preventDefault ()   // Prevent default to allow drop
        , dragEnter : event => dragDrop.update ( 'move', {event})
        , drop      : event => dragDrop.update ( 'drop', {event})
    
    }} // getEventFunctions func.



export default getEventFunctions


