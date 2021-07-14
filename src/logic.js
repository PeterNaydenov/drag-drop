const table = [
    // [ state     , action         , nextState   , functionName    , chainAction(optional)]
      [ 'none'     , 'start'        , 'wait'      , 'setConfig' ,    [ 'start', false ]  ]
    , [ 'wait'     , 'start'        , 'ready'     , 'start'                             ]

    // Selecting
    , [ 'ready'    , 'addItem'      , 'ready'     , 'addSingleItem'     ]
    , [ 'ready'    , 'newSelection' , 'ready'     , 'replaceSelection'  ]
    , [ 'ready'    , 'removeItem'   , 'ready'     , 'removeSingleItem'  ]
    , [ 'ready'    , 'select'       , 'inSelect'  , 'startSelection'    ]
    , [ 'inSelect' , 'move'         , 'inSelect'  , 'changeSelection'   ]
    , [ 'inSelect' , 'end'          , 'ready'     , 'endSelection'      ]
    
    // Draging
    , [ 'ready'    , 'drag'        , 'inDrag'     , 'startDragging'   ]
    , [ 'inDrag'   , 'end'         , 'ready'      , 'endDragging'     ]
    , [ 'inDrag'   , 'move'        , 'inDrag'     , 'changeDragZone'  ]
    , [ 'inDrag'   , 'drop'        , 'inDrag'     , 'drop'            ]   
    
    // Mute for a while
    , [ 'ready'   , 'disable'      , 'off'        , 'disable'     ]
    , [ 'off'     , 'enable'       , 'ready'      , 'enable'      ]
    
    // Others
    , [ 'off'     , 'changeConfig'  , 'off'        , 'setConfig'    ]
    , [ 'ready'   , 'changeConfig'  , 'ready'      , 'setConfig'    ]
    , [ 'ready'   , 'destroy'      , 'end'        , 'destroy'     ]
    , [ 'off'     , 'destroy'      , 'end'        , 'destroy'     ]
];


const logic = {
                   init : 'none'
                 , table
                 , stateData : {
                                  dropStyle            : 'dropzone'   // CSS class name for drop zone
                                , selectStyle          : 'dd-select'  // CSS class name for selected drag elements
                                , draggedTransperency  : 0.5          // Transperency of dragged DOM element
                                , selection            : []           // Selected DOM elements
                                , dragged              : null         // Dragged element. Could be one or many
                                , activeDropZone       : null         // Active drop zone DOM element
                                , activeZoneStyle      : 'actZone'    // Active drop zone style name
                                , selectDraw           : null         // DOM node for showing selection
                                , mouseSelection       : false        // Selection mode flag
                                , hasDrop              : false        // Flag[boolean]. It's true when registered drop event.

                                , startX : 0
                                , startY : 0
                                , newX   : false
                                , newY   : false
                        }
        }



export default logic


