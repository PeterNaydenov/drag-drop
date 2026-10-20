'use strict'
// ***

import getDraggable from './getDraggable'



function getEventFunctions ( dragDrop, ignoreSelect ) {
    return {
          mouseDown: event => {
                if ( event.button !== 0                  )   return   // Left mouse button only
                if ( getDraggable ( event.target )       )   return
                if ( isInteractive ( event.target )      )   return   // Selection calls preventDefault and that blocks focus of form fields
                if ( ignoreSelect && ignoreSelect(event) )   return
                dragDrop.update ( 'select', {event})
            }

        , mouseUp: event  => {
                            const target = getDraggable ( event.target );
                            if ( target && dragDrop.getState () !== 'inSelect' ) {   // Mouse selection always ends with 'end'
                                        if      ( event.altKey    )   dragDrop.update ( 'removeItem'  , {event, target} )
                                        else if ( event.shiftKey  )   dragDrop.update ( 'addItem'     , {event, target} )
                                        else                          dragDrop.update ( 'newSelection', {event, target} )
                                        return
                                }
                            dragDrop.update ( 'end', {event})
                    }
        , mouseMove : event => {
                            dragDrop.update ( 'move', {event})
                    }

        , dragStart : event => {
                            const target = getDraggable ( event.target );
                            if ( !target )   return   // Native drag of images, links, text. Not a drag node
                            dragDrop.update ( 'drag', {event, target})
                    }
        , dragEnd   : event => {
                            dragDrop.ignoreCachedUpdates ()
                            dragDrop.update ( 'end', {event})
                    }
        , dragOver  : event => {
                            event.preventDefault ()   // Prevent default to allow drop
                            dragDrop.update ( 'over', {event})
                    }
        , dragEnter : event => dragDrop.update ( 'move', {event})
        , drop      : event => dragDrop.update ( 'drop', {event})
    
    }} // getEventFunctions func.



function isInteractive ( node ) {   // Form fields and editable content
        const el = ( node && node.nodeType === 1 ) ? node : node && node.parentElement;
        if ( !el )   return false
        return el.isContentEditable || !!el.closest ( 'input, textarea, select, option, button, label' )
} // isInteractive func.



export default getEventFunctions


