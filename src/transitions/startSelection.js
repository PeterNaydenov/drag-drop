function startSelection ({ task, dependencies, extractList}, data ) {
    const 
          { event } = data
        , { fn    } = dependencies
        , [ selectDraw ] = extractList ([ 'selectDraw' ])
        , st = {}
        ;
    event.preventDefault ()
    st.selectDraw = fn.drawSelection ( event, selectDraw )
    st.mouseSelection = true
    st.startX = event.clientX
    st.startY = event.clientY

    task.done ({
                      success : true
                    , stateData : st
                })
} // startSelection func.



export { startSelection }


