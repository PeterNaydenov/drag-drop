import start from './start'
import { startSelection   } from './startSelection'
import { changeSelection  } from './changeSelection'
import { endSelection     } from './endSelection'
import { addSingleItem    } from './addSingleItem'
import { removeSingleItem } from './removeSingleItem'
import { replaceSelection } from './replaceSelection'

import { startDragging    } from './startDragging'
import { changeDragZone   } from './changeDragZone'
import { changePosition   } from './changePosition'
import { endDragging      } from './endDragging'
import { drop             } from './drop'

import { destroy          } from './destory'
import { setConfig         } from './setConfig'
import { disable          } from './disable'
import { enable           } from './enable'



const tranistions = {
                          start
                        , startSelection
                        , changeSelection
                        , endSelection
                        , addSingleItem
                        , removeSingleItem
                        , replaceSelection

                        , startDragging
                        , changeDragZone
                        , changePosition
                        , endDragging
                        , drop

                        , destroy
                        , setConfig
                        , disable
                        , enable
                }



export default tranistions


