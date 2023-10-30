'use strict'
/**
 * @type {Object} LogData
 * @description The data object contains drag and drop information.
 * @property {HTMLElement} source - The source container element.
 * @property {HTMLElement|Boolean} target - The target container element. If the drop is outside of a container, the value is false.
 * @property {HTMLElement} el - The dragged element.
 * @property {Function} sourceList - Returns the list of selected elements.
 */



/**
 * @type {Object} DropOutParams
 * @description The parameters passed to the hook 'onDropOut'.
 * @property {DragEvent} event - The browser 'DragEvent'event object.
 * @property {Boolean} dropZone - Constant equal to false in this hook;
 * @property {HTMLElement} dragged - The dragged element.
 * @property {Array<HTMLElement>} selection - The dragged elements.
 * @property {LogData} log - The log object.
 * @property {Object} dragOffset - Position of the drag start - {x,y}.
 */



/**
 *  @function onDropOut
 *  @description Executes when the user drops the dragged elements outside of a drop zone.
 *  @param {DropOutParams} data - The data object with named arguments.
 *  @returns { void }
 */
function onDropOut ({event, dropZone, dragged, selection, log, dragOffset }) {
        // Drop outside of container
        console.log ( 'DROP OUT' )
} // onDropOut func.



export default onDropOut


