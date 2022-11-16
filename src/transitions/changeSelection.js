function changeSelection ( task, dependencies, stateData, data ) {
    let
          { mouseSelection, selectDraw, startX, startY } = stateData
        , { event } = data
        , { fn } = dependencies
        ;

// console.log ( mouseSelection )
// console.log ( selectDraw )
// console.log ( stateData )

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

    stateData.newX = newX
    stateData.newY = newY
    task.done ({
                      success : true
                    , stateData
            })

} // changeSelection func.



export { changeSelection }


