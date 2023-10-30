function changeSelection ({task, dependencies, extractList}, data ) {
    let
          { event } = data
        , { fn } = dependencies
        , [ mouseSelection, selectDraw, startX, startY ] = extractList(['mouseSelection', 'selectDraw', 'startX', 'startY'])
        ;
    if ( !mouseSelection ) {  
                    task.done ({ success: false })
                    return
        }

    event.preventDefault ()
    let 
        newX = event.clientX
      , newY = event.clientY
      ;

    fn.updateSelection ( fn.minMax({startX,startY,newX,newY}), selectDraw )
    task.done ({
                      success : true
                    , stateData : { newX, newY }
            })

} // changeSelection func.



export { changeSelection }


