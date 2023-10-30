/**
 * @type {Object} DropParams
 * @description The parameters passed to the hook 'onDrop'.
 * @property {Object} event - The event object.
 * @property {Object} dropZone - The drop zone element.
 * @property {HTMLElement} dragged - The dragged element.
 * @property {Array} selection - The dragged elements.
 * @property {Array} log - The log array.
 * @property {Object} dragOffset - Position of the drag start - {x,y}.
 */

/**
 * @function onDrop
 * @description Executes when the user drops the dragged elements on a drop zone.
 * @param {DropParams} data - The data object passed to the hook 'onDrop'.
 * @returns { void }
 */
function onDrop ({ event, dropZone, dragged, selection, log, dragOffset }) {
        // Move dragged DOM elements to the selected drop target
        if ( !dropZone )   return
        selection.forEach ( el => {
                        el.parentNode.removeChild ( el )
                        dropZone.appendChild ( el )
                })
        dragged.style = ''
} // onDrop func.



export default onDrop


