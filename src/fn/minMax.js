function minMax ({startX, startY, newX, newY}) {
        let
              xMin = Math.min ( startX, newX )
            , xMax = Math.max ( startX, newX )
            , yMin = Math.min ( startY, newY )
            , yMax = Math.max ( startY, newY )
            ;
        return { xMin, xMax, yMin, yMax }
} // minMax func.



export default minMax


