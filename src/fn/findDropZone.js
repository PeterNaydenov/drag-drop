function findDropZone ( node, dropStyle ) {
        if ( !node || typeof node === 'string'  )   return false
        if ( node === document                  )   return false
        if ( node.tagName == 'BODY'             )   return false
        if ( node.classList && node.classList.contains(dropStyle) )   return node   // Text nodes have no classList
        return findDropZone ( node.parentNode, dropStyle )
} // findDropZone func.



export default findDropZone


