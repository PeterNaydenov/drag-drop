function onStartDragging ({event, selection, draggedTransperency, selectStyle }) {
            selection.forEach ( el => { 
                                    el.style.opacity = draggedTransperency
                                    el.classList.add ( selectStyle )
                        })
    } // onStartDragging func.



export default onStartDragging


