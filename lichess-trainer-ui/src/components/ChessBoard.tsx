
import React, { Component } from 'react';
const pieceComponents = require('../pieces')
const resizeAware = require('react-resize-aware')

const ResizeAware = resizeAware.default || resizeAware

const square = 100 / 8
const squareSize = `${square}%`
const squareStyles = {
    width: squareSize,
    paddingBottom: squareSize,
    float: 'left',
    position: 'relative',
    pointerEvents: 'none'
  }

// export type ChessBoardProps = {
//     rows: Number,
//     columns: Number
// }


const labelStyles = {fontSize: 'calc(7px + .5vw)', position: 'absolute', userSelect: 'none'}
const yLabelStyles = Object.assign({top: '5%', left: '5%'}, labelStyles)
const xLabelStyles = Object.assign({bottom: '5%', right: '5%'}, labelStyles)


// export class ChessBoard extends Component<ChessBoardProps> {
//     constructor(props: ChessBoardProps) {
//         super(props);
//         //this.props.drawLabels=true
//     }
export class ChessBoard extends React.Component {

    renderLabelText(x: Number, y: Number) {
        const isLeftColumn = x === 0
        const isBottomRow = y === 7
    
        //if (!this.props.drawLabels || (!isLeftColumn && !isBottomRow)) {
        if ((!isLeftColumn && !isBottomRow)) {
          return null
        }
    
        if (isLeftColumn && isBottomRow) {
          return [
            <span key="blx" style={xLabelStyles}>
              a
            </span>,
            <span key="bly" style={yLabelStyles}>
              1
            </span>
          ]
        }
    }

    render() {

        const all_boxes = []

        for(let y=0; y<8;y++){
            for(let x=0; x<8;x++){
                //const isTarget = targetTile && targetTile.x === x && targetTile.y === y
                const background = 'black'
                //const boxShadow = isTarget ? 'inset 0px 0px 0px 0.4vmin yellow' : undefined
                const boxShadow = undefined
                const styles = Object.assign({background, boxShadow}, squareStyles)

                all_boxes.push(
                    <div key={`rect-${x}-${y}`} style={styles}>
                        {this.renderLabelText(x, y)}
                    </div>
                )
            }
        }

        return (
          <div>
            Hello3
          </div>
        )
    }
}

// ChessBoard.defaultProps = {
//   allowMoves: true,
//   highlightTarget: true,
//   drawLabels: true,
//   onMovePiece: noop,
//   onDragStart: noop,
//   lightSquareColor: '#f0d9b5',
//   darkSquareColor: '#b58863',
//   pieces: getDefaultLineup()
// }

const a_board = new ChessBoard(8);


export default ChessBoard;