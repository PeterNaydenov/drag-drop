function addSingleItem ( task, dependencies, stateData, data ) {
        let 
              { event } = data
            , target = event.target
            , { selection, selectStyle } = stateData
            , listHasTarget = selection.includes(target)
            ;

        if ( !listHasTarget ) {  
                selection.push ( target )
                target.classList.add ( selectStyle )
          }
        
        task.done ({
                          success : true
                        , stateData
                })
} // addSingleItem func.



export { addSingleItem }


