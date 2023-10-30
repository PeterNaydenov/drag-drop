function endSelection ({task, dependencies, extractList}, data ) {
    let 
          { event } = data
        , { fn    } = dependencies
        , [ 
              prevSelection
            , startX
            , startY
            , newX
            , newY
            , selectDraw
            , selectStyle
            , filter 
                ] = extractList ([
                                  'selection'
                                , 'startX'
                                ,'startY'
                                ,'newX'
                                ,'newY'
                                ,'selectDraw'
                                ,'selectStyle'
                                ,'filter'
                            ])
        , selectionType = 'new'   // Types: new | expand | reduce 
        , selection = []
        ;

        event.preventDefault ()
        selectDraw.style.visibility = 'hidden'

        if ( !newX ) {   // No selection ( newX == false )
                        prevSelection.forEach ( el => el.classList.remove ( selectStyle )   )
                        selection = []
                        task.done ({
                                       success : true
                                     , stateData : { selection }
                                })
                        return
                } // !newX
        
        if ( event.altKey               )   selectionType = 'reduce'
        if ( event.shiftKey             )   selectionType = 'expand'
        if ( selectionType !== 'expand' )   prevSelection.forEach ( el => {
                                                            el.classList.remove ( selectStyle )
                                                    })
        
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
                            selection = selection.map ( el => {
                                                            el.classList.add (selectStyle)  
                                                            return el
                                                        })
                            break
                case 'expand':
                            selection = selection.reduce ((res,el) => {
                                                                    if ( !res.includes(el) ) {  
                                                                                    res.push ( el )
                                                                                    el.classList.add ( selectStyle )
                                                                        }
                                                                    return res
                                                            } , selection )
                            break
                case 'reduce':
                            selection = selection.reduce ( (res,el) => {
                                                                    if ( !selection.includes(el) ) {  
                                                                                    res.push ( el )
                                                                                    el.classList.add ( selectStyle )
                                                                        }
                                                                    return res
                                                             },[])
                            break
            } // switch selectionType

        const mouseSelection = false;
        newX   = false
        newY   = false

        task.done ({
                          success : true
                        , stateData : { selection, mouseSelection, newX, newY }
                })
} // endSelection func.



export { endSelection }


