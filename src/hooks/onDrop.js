function onDrop ({ event, dropZone, dragged, selection, log }) {
        // Move dragged DOM elements to the selected drop target
        selection.forEach ( el => {
                        el.parentNode.removeChild ( el )
                        dropZone.appendChild ( el )
                })
        dragged.style = ''
} // onDrop func.



export default onDrop


