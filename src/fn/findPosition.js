/**
 * @function findPosition
 * @description Finds where dropped items should be inserted inside a drop zone.
 * @param {HTMLElement} zone - The drop zone element.
 * @param {number} x - Mouse clientX.
 * @param {number} y - Mouse clientY.
 * @param {Array<Node>} skip - Nodes to ignore ( dragged items, placeholder ).
 * @returns {{ before: Node|null, ref: HTMLElement|null, after: boolean, inRow: boolean }}
 *  - before: insert the items before this node. Null means append at the end of the zone;
 *  - ref: the closest drag node. Null if the zone has no drag nodes;
 *  - after: true if the position is after 'ref';
 *  - inRow: true if 'ref' is part of a row ( horizontal list or grid ).
 */
function findPosition ( zone, x, y, skip=[] ) {
        const items = [ ...zone.children ].filter ( el => el.getAttribute ( 'draggable' ) === 'true' && !skip.includes ( el ) );
        if ( items.length === 0 )   return { before: null, ref: null, after: false, inRow: false }

        const rects = items.map ( el => el.getBoundingClientRect () );
        let ref, rect, distance = Infinity;
        items.forEach ( ( el, i ) => {   // Closest drag node. Distance is 0 when the mouse is over the node
                    const
                          r  = rects[i]
                        , dx = Math.max ( r.left - x, 0, x - r.right  )
                        , dy = Math.max ( r.top  - y, 0, y - r.bottom )
                        , d  = dx*dx + dy*dy
                        ;
                    if ( d < distance ) {  ref = el; rect = r; distance = d   }
            })

        const
              inRow = ( items.length > 1 ) ? rects.some ( ( r, i ) => i > 0 && sameRow ( rects[i-1], r ))   // Zone is a horizontal list or a grid
                                           : isRowLayout ( zone )
            , after = inRow ? x > rect.left + rect.width/2 : y > rect.top + rect.height/2
            ;
        return {
                  before : after ? nextNode ( ref, skip ) : ref
                , ref
                , after
                , inRow
            }
} // findPosition func.



function sameRow ( a, b ) {   // Rectangles overlap vertically for more than a half of the smaller one
        const overlap = Math.min ( a.bottom, b.bottom ) - Math.max ( a.top, b.top );
        return overlap > Math.min ( a.height, b.height ) / 2
} // sameRow func.



function isRowLayout ( zone ) {   // Only one drag node in the zone: check the zone CSS
        const { display, flexDirection, gridTemplateColumns } = getComputedStyle ( zone );
        if ( display.includes ( 'flex' ) )   return flexDirection.startsWith ( 'row' )
        if ( display.includes ( 'grid' ) )   return gridTemplateColumns.trim().split ( /\s+/ ).length > 1
        return false
} // isRowLayout func.



function nextNode ( node, skip ) {   // Next sibling that is not in the skip list
        let next = node.nextSibling;
        while ( next && skip.includes ( next ) )   next = next.nextSibling
        return next
} // nextNode func.



export default findPosition


