import React, { Component } from 'react';
import CSS from 'csstype';
import BlackKnight from '../pieces/BlackKnight';
import BlackBishop from '../pieces/BlackBishop';
import BlackRook from '../pieces/BlackRook';
import BlackKing from '../pieces/BlackKing';
import BlackQueen from '../pieces/BlackQueen';

const Draggable = require('react-draggable')
const defaultLineup = require('../defaultLineup')
const pieceComponents = require('../pieces')
const decode = require('./decode')


const getDefaultLineup = () => defaultLineup.slice()

type square_box = {
    x_cord: Number,
    y_cord: Number,
    box_style: CSS.Properties
}

const square = 100 / 8
const squareSize = `${square}%`

const box_style: CSS.Properties = {
    width: squareSize,
    //width: '100px',
    paddingBottom: squareSize,
    float: 'left',
    position: 'relative',
    pointerEvents: 'none',
    height: squareSize,
  }

let tiles: square_box[];
  
export class ChessBoard extends Component{

    setup() {

        tiles = []

        let count = 0

        for(let y=0; y<8 ;y++){
            count = count+1
            for(let x=0;x<8;x++){
                const unique_id = 10*y+x

                const boxShadow = undefined

                //colour is white
                let backgroundColor = '#f0d9b5'
                if(count%2 == 0){
                    backgroundColor = '#b58863'
                    //colour is black
                }
                const top=y*square
                
                const this_style = Object.assign({backgroundColor, top}, box_style)
                const temp_square = {x_cord: x, y_cord: y, box_style:this_style}


                count = count+1

                tiles.push(temp_square)
            }
        }
    }


    componentWillMount() {
        this.setup();
    }

    render() {
        
        const these_pieces = getDefaultLineup()

        console.log(these_pieces)
        // const pieces = these_pieces.map((decl, i) => 
        // const isMoving = draggingPiece && i === draggingPiece.index
        // const {x, y, piece} = decode.fromPieceDecl(decl)
        // const Piece = pieceComponents[piece]
        // return (
        //     <Draggable
        //     bounds="parent"
        //     position={{x: 0, y: 0}}
        //     //onStart={this.handleDragStart}
        //     //onDrag={this.handleDrag}
        //     //onStop={this.handleDragStop}
        //     key={`${piece}-${x}-${y}`}>
        //     <Piece isMoving={isMoving} x={x} y={y} />
        //     </Draggable>
        // )
        //   })

        // const pieces = these_pieces.map((dec1: String, i:Number) => {
        //     const {x, y, piece} = decode.fromPieceDecl(decl)
        //     const Piece = pieceComponents[piece]

        // }
        
        // )

        //const children = tiles.concat(pieces)

        const all_tiles = tiles.map(this_square => {
            switch(this_square.y_cord) {
                case 0: 
                    switch(this_square.x_cord) {
                        case 0:
                            return <div style={this_square.box_style}>{BlackRook()}</div>
                        case 1:
                            return <div style={this_square.box_style}>{BlackKnight()}</div>
                        case 2:
                            return <div style={this_square.box_style}>{BlackBishop()}</div>
                        case 3:
                            return <div style={this_square.box_style}>{BlackKing()}</div>
                        case 4:
                            return <div style={this_square.box_style}>{BlackQueen()}</div>
                        case 5:
                            return <div style={this_square.box_style}>{BlackBishop()}</div>
                        case 6:
                            return <div style={this_square.box_style}>{BlackKnight()}</div>
                        case 7:
                            return <div style={this_square.box_style}>{BlackRook()}</div>
                    }
                case 7:
                    switch(this_square.y_cord) {
                        case 0:
                            return <div style={this_square.box_style}>{BlackRook()}</div>
                        case 1:
                            return <div style={this_square.box_style}>{BlackKnight()}</div>
                        case 2:
                            return <div style={this_square.box_style}>{BlackBishop()}</div>
                        case 3:
                            return <div style={this_square.box_style}>{BlackKing()}</div>
                        case 4:
                            return <div style={this_square.box_style}>{BlackQueen()}</div>
                        case 5:
                            return <div style={this_square.box_style}>{BlackBishop()}</div>
                        case 6:
                            return <div style={this_square.box_style}>{BlackKnight()}</div>
                        case 7:
                            return <div style={this_square.box_style}>{BlackRook()}</div>
                    }
                default:
                    return <div style={this_square.box_style}></div>
            }

        })

        return all_tiles
    }
}

export default ChessBoard;