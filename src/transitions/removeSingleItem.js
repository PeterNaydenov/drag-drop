function removeSingleItem ( task, dependencies, stateData, data ) {
        let 
              { event } = data
            , target = event.target
            , { selection, selectStyle } = stateData
            ;
        stateData.selection = selection.reduce ( (res,el) => {
                                                    if ( el != target )   res.push ( el )
                                                    else    el.classList.remove ( selectStyle )
                                                    return res
                                            },[])
        task.done ({
                          success : true
                        , stateData
                })
} // removeSingleItem func.



export { removeSingleItem }


