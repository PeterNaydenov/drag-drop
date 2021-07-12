function startSelection ( task, dependencies, stateData, data ) {
    const 
          { event } = data
        , { fn    } = dependencies
        , { selectDraw } = stateData
        ;
    event.preventDefault ()
    stateData.selectDraw = fn.drawSelection ( event, selectDraw )
    stateData.mouseSelection = true
    stateData.startX = event.clientX
    stateData.startY = event.clientY

    task.done ({
                      success : true
                    , stateData
                })
} // startSelection func.



export { startSelection }


