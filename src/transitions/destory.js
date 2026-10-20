function destroy ({task, dependencies, extractList}) {
        let
              { eFn } = dependencies
            , [ selectDraw, selection, selectStyle ] = extractList ([ 'selectDraw', 'selection', 'selectStyle' ])
            ;
        if ( selectDraw )   selectDraw.remove ()   // Selection frame is added to the body
        selection.forEach ( el => el.classList.remove ( selectStyle ) )

        document.removeEventListener ( 'mousedown', eFn.mouseDown )
        document.removeEventListener ( 'mousemove', eFn.mouseMove )
        document.removeEventListener ( 'mouseup'  , eFn.mouseUp   )

        document.removeEventListener ( 'dragstart' , eFn.dragStart )
        document.removeEventListener ( 'dragend'   , eFn.dragEnd   )
        document.removeEventListener ( 'dragover'  , eFn.dragOver  )
        document.removeEventListener ( 'dragenter' , eFn.dragEnter )
        document.removeEventListener ( 'drop'      , eFn.drop      )
        task.done ({
                          success : true
                        , stateData : { selectDraw: null, selection: [] }
                })
} // destroy func.



export { destroy }


