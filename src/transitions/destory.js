function destroy ( task, dependencies, stateData, data ) {
        let  { eFn } = dependencies;
        document.removeEventListener ( 'mousedown', eFn.mouseDown )
        document.removeEventListener ( 'mousemove', eFn.mouseMove )
        document.removeEventListener ( 'mouseup'  , eFn.mouseUp   )

        document.removeEventListener ( 'dragstart' , eFn.dragStart )
        document.removeEventListener ( 'dragend'   , eFn.dragEnd   )
        document.removeEventListener ( 'dragover'  , eFn.dragOver  )
        document.removeEventListener ( 'dragenter' , eFn.dragEnter )
        document.removeEventListener ( 'drop'      , eFn.drop      )
        task.done ({ success : true })
} // destroy func.



export { destroy }


