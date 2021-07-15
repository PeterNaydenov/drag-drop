function replaceSelection ( task, dependencies, stateData, data ) {
        let 
              { event } = data
            , { selectStyle, filter } = stateData
            , target = event.target
            , validNode = true
            ;

        if ( filter )   validNode = target.classList.contains ( filter )
        if ( !validNode ) {
                    task.done ({ success : false })
                    return
            }
            
        stateData.selection.forEach ( el => el.classList.remove ( selectStyle ) )
        target.classList.add ( selectStyle )
        stateData.selection = [ target ]
        task.done ({
                          success : true
                        , stateData
                })
} // replaceSelection func.



export { replaceSelection }


