/**
 * @function drawIndicator
 * @description Shows where dropped items will be inserted. Creates the indicator element if it doesn't exist.
 * @param {Object} data
 * @param {'placeholder'|'line'} data.reorder - Indicator type.
 * @param {HTMLElement|null} data.indicator - Existing indicator element.
 * @param {HTMLElement} data.zone - Active drop zone.
 * @param {Object} data.position - Result of 'findPosition'.
 * @param {HTMLElement} data.dragged - The dragged element. Placeholder takes its tag name and size.
 * @param {string} data.placeholderStyle - CSS class name for the indicator.
 * @param {Array<Node>} data.skip - Nodes ignored by 'findPosition'.
 * @returns {HTMLElement} - The indicator element.
 */
function drawIndicator ({ reorder, indicator, zone, position, dragged, placeholderStyle, skip }) {
        let el = indicator;
        if ( !el )   el = ( reorder === 'placeholder' ) ? createPlaceholder ( dragged ) : createLine ()
        el.classList.add ( placeholderStyle )

        if ( reorder === 'placeholder' ) {
                    const { before } = position;
                    let next = el.nextSibling;
                    while ( next && skip.includes ( next ) )   next = next.nextSibling
                    if ( el.parentNode !== zone || next !== before )   zone.insertBefore ( el, before )   // Move only when the position is changed
                    return el
            }

        // Line indicator: positioned over the page
        const { ref, after, inRow } = position;
        let left, top, width, height;
        if ( !ref ) {   // Empty drop zone: line on top of the zone
                    const r = zone.getBoundingClientRect ();
                    left = r.left;   top = r.top;   width = r.width;   height = 2
            }
        else {
                    const r = ref.getBoundingClientRect ();
                    if ( inRow ) {   // Vertical line on the left or right side of 'ref'
                                left = ( after ? r.right : r.left ) - 1;   top = r.top;   width = 2;   height = r.height
                        }
                    else {           // Horizontal line on the top or bottom side of 'ref'
                                left = r.left;   top = ( after ? r.bottom : r.top ) - 1;   width = r.width;   height = 2
                        }
            }
        Object.assign ( el.style, { left:`${left}px`, top:`${top}px`, width:`${width}px`, height:`${height}px` })
        if ( !el.parentNode )   document.body.appendChild ( el )
        return el
} // drawIndicator func.



function createPlaceholder ( dragged ) {   // Same tag and size as the dragged element. Looks: CSS class
        const
              el = document.createElement ( dragged ? dragged.tagName : 'div' )
            , r  = dragged ? dragged.getBoundingClientRect () : { width:0, height:0 }
            ;
        el.style.boxSizing = 'border-box'
        el.style.width     = `${r.width}px`
        el.style.height    = `${r.height}px`
        return el
} // createPlaceholder func.



function createLine () {
        const el = document.createElement ( 'div' );
        el.style.position      = 'fixed'   // Coordinates are viewport based
        el.style.pointerEvents = 'none'
        el.style.zIndex        = '10000'
        return el
} // createLine func.



export default drawIndicator


