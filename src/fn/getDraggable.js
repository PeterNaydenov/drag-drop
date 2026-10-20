function getDraggable ( node ) {   // Returns the drag node ( draggable="true" ) that contains the node or null
        if ( !node )   return null
        const el = ( node.nodeType === 1 ) ? node : node.parentElement;   // Text nodes -> parent element
        return el ? el.closest ( '[draggable="true"]' ) : null
} // getDraggable func.



export default getDraggable


