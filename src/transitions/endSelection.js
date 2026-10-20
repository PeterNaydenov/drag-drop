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

        if ( newX === false ) {   // No mouse move -> no selection frame. ( newX can be 0 )
                        prevSelection.forEach ( el => el.classList.remove ( selectStyle )   )
                        selection = []
                        task.done ({
                                       success : true
                                     , stateData : { selection, mouseSelection: false }
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
              dragNodes = document.querySelectorAll ( '[draggable="true"]' )
            , list = []
            ;

        if ( filter ) {
                    dragNodes.forEach ( el => {
                                    if ( el.classList.contains(filter) )   list.push ( el )
                            })
            }
        else        dragNodes.forEach ( el => list.push(el)   )
        
        list.forEach ( el => {   // Mouse coordinates are viewport based, so compare with the viewport rectangle
                            const { left, top, right, bottom } = el.getBoundingClientRect ();
                            if ( left > xMin && top > yMin && right < xMax && bottom < yMax )   selection.push ( el )
                })
        
        switch ( selectionType ) {
                case 'new' :
                            selection = selection.map ( el => {
                                                            el.classList.add (selectStyle)  
                                                            return el
                                                        })
                            break
                case 'expand':   // Previous selection + framed elements
                            selection = selection.reduce ((res,el) => {
                                                                    if ( !res.includes(el) ) {
                                                                                    res.push ( el )
                                                                                    el.classList.add ( selectStyle )
                                                                        }
                                                                    return res
                                                            } , [ ...prevSelection ] )
                            break
                case 'reduce':   // Previous selection - framed elements
                            selection = prevSelection.reduce ( (res,el) => {
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


