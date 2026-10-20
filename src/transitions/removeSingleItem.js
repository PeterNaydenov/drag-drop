function removeSingleItem ( {task, extractList}, data ) {
        let 
              { event, target } = data
            , [ selection, selectStyle ] = extractList ([ 'selection', 'selectStyle' ])
            ;
        selection = selection.reduce ( (res,el) => {
                                if ( el != target )   res.push ( el )
                                else    el.classList.remove ( selectStyle )
                                return res
                        },[])
        task.done ({
                          success : true
                        , stateData : { selection }
                })
} // removeSingleItem func.



export { removeSingleItem }


