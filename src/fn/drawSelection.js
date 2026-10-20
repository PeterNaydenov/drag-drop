function drawSelection ( event, selectDraw ) {
        let draw;
        if ( !selectDraw ) {   // Create a selection block if not exists
                    draw = document.createElement ( 'div' )
                    draw.style.position = 'fixed'   // Coordinates come from event.clientX/Y ( viewport )
                    draw.style.border = '1px dotted #333'
                    draw.style.pointerEvents = 'none'   // Let mouse events reach the elements below
                    document.getElementsByTagName ( 'body' )[0].appendChild ( draw )
            }
        else {   // Load a selection block
                    draw = selectDraw
                    draw.style.visibility = 'visible'
            }
        draw.style.left   = `${event.clientX}px`
        draw.style.top    = `${event.clientY}px`
        draw.style.width  = '20px'
        draw.style.height = '20px'
        return draw
} // drawSelection func.



export default drawSelection


