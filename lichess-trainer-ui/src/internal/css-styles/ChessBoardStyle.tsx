import CSS from 'csstype';

const square = 100 / 8
const squareSize = `${square}%`

export const TileStyle: CSS.Properties = {
    width: squareSize,
    height: squareSize,
    paddingBottom: squareSize,
    float: 'left',
    position: 'relative',
    pointerEvents: 'none',
    alignItems: 'center',
}
