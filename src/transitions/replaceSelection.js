function replaceSelection ( task, dependencies, stateData, data ) {
        let 
              { event } = data
            , { selectStyle } = stateData
            , target = event.target
            ;
        stateData.selection.forEach ( el => el.classList.remove ( selectStyle ) )
        target.classList.add ( selectStyle )
        stateData.selection = [ target ]
        task.done ({
                          success : true
                        , stateData
                })
} // replaceSelection func.



export { replaceSelection }


