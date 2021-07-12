function onDrop ({event, dragged, selection, log }) {
        // Move dragged DOM elements to the selected drop target
        selection.forEach ( el => {
                        el.parentNode.removeChild ( el )
                        event.target.appendChild ( el )
                })
        dragged.style = ''
} // onDrop func.



export default onDrop


