function replaceSelection ( { task, extractList}, data ) {
        let 
              { event } = data
            , [ selectStyle, filter ] = extractList ([ 'selectStyle', 'filter' ])
            , target = event.target
            , validNode = true
            ;

        if ( filter )   validNode = target.classList.contains ( filter )
        if ( !validNode ) {
                    task.done ({ success : false })
                    return
            }
            
        selection.forEach ( el => el.classList.remove ( selectStyle ) )
        target.classList.add ( selectStyle )
        selection = [ target ]
        task.done ({
                          success : true
                        , stateData : { selection }
                })
} // replaceSelection func.



export { replaceSelection }


