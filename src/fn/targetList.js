'use strict'
function targetList ( container ) {
    return function targetList () {
            let 
                  list = document.querySelectorAll ( '[draggable="true"]' )
                , selection = []
                ;
            list.forEach ( el => {
                                if ( el.parentNode == container )   selection.push ( el )
                    })
            return selection
    }} // targetList func.



export default targetList


