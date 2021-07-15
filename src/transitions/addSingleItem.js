function addSingleItem ( task, dependencies, stateData, data ) {
        let 
              { event } = data
            , target = event.target
            , { selection, selectStyle, filter } = stateData
            , listHasTarget = selection.includes(target)
            , validNode = true
            ;
            
        if ( filter )   validNode = target.classList.contains ( filter )
        if ( !listHasTarget && validNode ) {  
                selection.push ( target )
                target.classList.add ( selectStyle )
          }
        
        task.done ({
                          success : true
                        , stateData
                })
} // addSingleItem func.



export { addSingleItem }


