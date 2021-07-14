function start ( task, dependencies, stateData, data ) {
    // *** Register all events needed
    let { eFn } = dependencies;
    
    document.addEventListener ( 'mousedown', eFn.mouseDown )
    document.addEventListener ( 'mousemove', eFn.mouseMove )
    document.addEventListener ( 'mouseup'  , eFn.mouseUp   )

    document.addEventListener ( 'dragstart' , eFn.dragStart )
    document.addEventListener ( 'dragend'   , eFn.dragEnd   )
    document.addEventListener ( 'dragover'  , eFn.dragOver  )
    document.addEventListener ( 'dragenter' , eFn.dragEnter )
    document.addEventListener ( 'drop'      , eFn.drop      )

    task.done ({ 
                      success  : true 
                    , response : data
            })
} // start func.



export default start


