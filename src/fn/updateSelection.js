function updateSelection ( coordinates, node ) {
    const { xMin, xMax, yMin, yMax } = coordinates;
    node.style.left   = `${xMin}px`
    node.style.top    = `${yMin}px`
    node.style.width  = `${xMax - xMin}px`
    node.style.height = `${yMax - yMin}px`
} // updateSelection func.



export default updateSelection


