function findDropZone ( node, dropStyle ) {
        if ( typeof node === 'string'           )   return false
        if ( node === document                  )   return false
        if ( node.tagName == 'BODY'             )   return false
        if ( node.classList.contains(dropStyle) )   return node
        return findDropZone ( node.parentNode, dropStyle )
} // findDropZone func.



export default findDropZone


