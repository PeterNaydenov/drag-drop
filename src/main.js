'use strict'

import Fsm from '@peter.naydenov/fsm'                // Finite state machine. url: https://github.com/PeterNaydenov/fsm

import fn from './fn/index'                           // Helper functions;
import hooks from './hooks/index'                     // Hook functions;
import logic from './logic'                           // Fsm logic and state vars;
import transitions from './transitions/index'         // Fsm transition library
import getEventFunctions from './fn/onEvent';    // Functions registered on events


function dragDrop ( config={} ) {
const 
      dragMachine = new Fsm ( logic, transitions )
    , eFn         = getEventFunctions ( dragMachine, config.ignoreSelect )
    , askForPromise = dragMachine.askForPromise
    ;
    // window.dd = dragMachine  // TODO: remove    
    dragMachine.setDependencies ({ eFn, fn, askForPromise })
    return dragMachine.update ( 'start', { config, hooks } )
               .then ( hooks => dragMachine.setDependencies ({ hooks })    )
               .then ( () => ({
                                  changeConfig : config => {
                                                        dragMachine.update ( 'changeConfig', {hooks,config} )
                                                                   .then   ( hooks => dragMachine.setDependencies({hooks})   )
                                                    }
                                , destroy     : ()    => dragMachine.update ( 'destroy' )
                                , disable     : ()    => dragMachine.update ( 'disable' )
                                , enable      : ()    => dragMachine.update ( 'enable'  )
                            }))
} // dragDrop func.



export default dragDrop


