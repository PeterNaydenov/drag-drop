function endSelection ( task, dependencies, stateData, data ) {
    let 
          { event } = data
        , { fn    } = dependencies
        , { startX, startY, newX, newY, selectDraw, selectStyle, filter } = stateData
        , selection = []
        , selectionType = 'new'   // Types: new | expand | reduce 
        ;
        event.preventDefault ()
        selectDraw.style.visibility = 'hidden'

        if ( !newX ) {   // No selection ( newX == false )
                        stateData.selection.forEach ( el => el.classList.remove ( selectStyle )   )
                        stateData.selection = []
                        task.done ({
                                       success : true
                                     , stateData
                                })
                        return
                } // !newX
        
        if ( event.altKey               )   selectionType = 'reduce'
        if ( event.shiftKey             )   selectionType = 'expand'
        if ( selectionType !== 'expand' )   stateData.selection.forEach ( el => el.classList.remove ( selectStyle )   )
        
        let { xMin, xMax, yMin, yMax } = fn.minMax ({ startX, startY, newX, newY })
        
        
        let 
              dragNodes = document.querySelectorAll ( '[draggable]' )
            , list = []
            ;

        if ( filter ) {
                    dragNodes.forEach ( el => {
                                    if ( el.classList.contains(filter) )   list.push ( el )
                            })
            }
        else        dragNodes.forEach ( el => list.push(el)   )
        
        list.forEach ( el => {
                            let check = true;
                            if ( check )   check = el.offsetLeft > xMin
                            if ( check )   check = el.offsetTop > yMin

                            if ( check ) {
                                    let lastX = el.offsetLeft + el.clientWidth;
                                    check = lastX < xMax
                                }
                            if ( check ) {
                                    let lastY = el.offsetTop + el.clientHeight;
                                    check = lastY < yMax
                                }
                            if ( check )   selection.push ( el )
                })
        
        switch ( selectionType ) {
                case 'new' :
                            stateData.selection = selection.map ( el => {
                                                            el.classList.add (selectStyle)  
                                                            return el
                                                        })
                            break
                case 'expand':
                            stateData.selection = selection.reduce ((res,el) => {
                                                                    if ( !res.includes(el) ) {  
                                                                                    res.push ( el )
                                                                                    el.classList.add ( selectStyle )
                                                                        }
                                                                    return res
                                                            } , stateData.selection )
                            break
                case 'reduce':
                            stateData.selection = stateData.selection.reduce ( (res,el) => {
                                                                    if ( !selection.includes(el) ) {  
                                                                                    res.push ( el )
                                                                                    el.classList.add ( selectStyle )
                                                                        }
                                                                    return res
                                                             },[])
                            break
            } // switch selectionType

        stateData.mouseSelection = false
        stateData.newX   = false
        stateData.newY   = false

        task.done ({
                          success : true
                        , stateData
                })
} // endSelection func.



export { endSelection }


