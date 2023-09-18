function addSingleItem ( {task, extractList}, data ) {
        let 
              { event } = data
            , target = event.target
            , [ selection, selectStyle, filter ] = extractList (['selection', 'selectStyle', 'filter'])
            , listHasTarget = selection.includes ( target )
            , validNode = true
            ;
        if ( filter )   validNode = target.classList.contains ( filter )
        if ( !listHasTarget && validNode ) {  
                selection.push ( target )
                target.classList.add ( selectStyle )
            }
        task.done ({
                          success : true
                        , stateData : { selection }
                })
} // addSingleItem func.



export { addSingleItem }


