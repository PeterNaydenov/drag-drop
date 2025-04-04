'use strict'

import Fsm from '@peter.naydenov/fsm'                // Finite state machine. url: https://github.com/PeterNaydenov/fsm

import fn from './fn/index'                           // Helper functions;
import hooks from './hooks/index'                     // Hook functions;
import logic from './logic'                           // Fsm logic and state vars;
import transitions from './transitions/index'         // Fsm transition library
import getEventFunctions from './fn/onEvent';         // Functions registered on events



function dragDrop ( config={} ) {
const 
      dragMachine = new Fsm ( logic, transitions )
    , eFn         = getEventFunctions ( dragMachine, config.ignoreSelect )
    ;
    
    window.dd = dragMachine  // TODO: remove 

    dragMachine.setDependencies ({ 'deps': config.dependencies })    
    dragMachine.setDependencies ({ eFn, fn })
    
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






// function yok () { console.log ( 'injected' )}

// const cfg = {
//             ignoreSelect ( e ) {
//                         const tg = e.target;
//                         if (!tg.classList.contains ( 'dropzone' ))   return true
//                         else         return false
//                 }
//           , onDropOut ({ dependencies, event, dragged, selection, log, dragOffset, dropZone }) {
//                         console.log ( 'YES drop out' )
//                         dependencies.yok ()
//                 }
//           , dependencies : {
//                                 yok
//                         }
//         }
// dragDrop (cfg)
//  .then ( x => {
//         dd.on ( 'transition', (s,m) => {
//                 console.log ( s,m )
//         })
//  })


