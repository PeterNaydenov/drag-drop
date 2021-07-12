function drawSelection ( event, selectDraw ) {
        let draw;
        if ( !selectDraw ) {   // Create a selection block if not exists
                    draw = document.createElement ( 'div' )
                    draw.style.position = 'absolute'
                    draw.style.border = '1px dotted #333'
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


