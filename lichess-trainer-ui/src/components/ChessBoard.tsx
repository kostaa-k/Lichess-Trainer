import React, { Component } from 'react';
import CSS from 'csstype';
import BlackKnight from '../pieces/black_knight.png';
import BlackBishop from '../pieces/black_bishop.png';
import BlackRook from '../pieces/black_rook.png';
import BlackKing from '../pieces/black_king.png';
import BlackQueen from '../pieces/black_queen.png';
import BlackPawn from '../pieces/black_pawn.png';
import WhiteKnight from '../pieces/white_knight.png';
import WhiteBishop from '../pieces/white_bishop.png';
import WhiteRook from '../pieces/white_rook.png';
import WhiteKing from '../pieces/white_king.png';
import WhiteQueen from '../pieces/white_queen.png';
import WhitePawn from '../pieces/white_pawn.png';

const defaultLineup = require('../defaultLineup')

const getDefaultLineup = () => defaultLineup.slice()

type square_box = {
    x_cord: Number,
    y_cord: Number,
    box_style: CSS.Properties,
}

type a_piece = {
    unique_id: String,
    current_square: square_box,
    letter: String
}

const square = 100 / 8
const squareSize = `${square}%`

const box_style: CSS.Properties = {
    width: squareSize,
    height: squareSize,
    paddingBottom: squareSize,
    float: 'left',
    position: 'relative',
    pointerEvents: 'none',
}

let tiles: square_box[][];

let piece_objects: a_piece[];

export class ChessBoard extends Component {

    setup() {

        tiles = []

        let count = 0

        let temp_Square_tiles: square_box[];

        for (let y = 0; y < 8; y++) {
            count = count + 1

            temp_Square_tiles = []
            for (let x = 0; x < 8; x++) {
                //colour is white
                let backgroundColor = '#f0d9b5'

                if (count % 2 == 0) {
                    //colour is black
                    backgroundColor = '#b58863'
                }
                const top = y * square
                const this_style = Object.assign({ backgroundColor, top }, box_style)
                const temp_square = { x_cord: x, y_cord: y, box_style: this_style }

                count = count + 1
                temp_Square_tiles.push(temp_square)
            }

            tiles.push(temp_Square_tiles)
        }
    }

    get_piece_picture(letter: String, size: Number) {
        switch (letter) {
            //WHITE PIECES
            case ("P"):
                return <img src={WhitePawn} id="piece"/>
            case ("R"):
                return <img src={WhiteRook} id="piece"/>
            case ("N"):
                return <img src={WhiteKnight} id="piece"/>
            case ("B"):
                return <img src={WhiteBishop} id="piece"/>
            case ("Q"):
                return <img src={WhiteQueen} id="piece"/>
            case ("K"):
                return <img src={WhiteKing} id="piece"/>
            //BLACK PIECES

            case ("p"):
                return <img src={BlackPawn} id="piece"/>
            case ("r"):
                return <img src={BlackRook} id="piece"/>
            case ("n"):
                return <img src={BlackKnight} id="piece" />
            case ("b"):
                return <img src={BlackBishop} id="piece"/>
            case ("q"):
                return <img src={BlackQueen} id="piece"/>
            case ("k"):
                return <img src={BlackKing} id="piece"/>
        }
    }

    decode_str_position(letter: String, the_num: number) {
        // const input= "a7"

        const x_cord = letter.charCodeAt(0) - 97;
        const y_cord = 8 - the_num;

        return tiles[y_cord][x_cord]
    }

    componentWillMount() {
        this.setup();
        this.initialize_pieces();
    }

    initialize_pieces() {

        piece_objects = []

        const these_pieces = getDefaultLineup()

        for (let i = 0; i < these_pieces.length; i++) {
            const piece_str = these_pieces[i];
            const position_str = piece_str.split(["@"])[1]
            const the_letter = position_str.charAt(0);
            const the_num_pos = Number(position_str.charAt(1));

            const piece_name = piece_str.split(["@"])[0];
            const piece_object = { unique_id: "hello", current_square: this.decode_str_position(the_letter, the_num_pos), letter: piece_name };

            piece_objects.push(piece_object);
        }
    }

    render() {
        const all_tiles = tiles.map(tileRow => {
            const some_tiles = tileRow.map(tile => {
                let listPieceInfo = piece_objects.filter(piece => piece.current_square.x_cord === tile.x_cord && piece.current_square.y_cord === tile.y_cord);

                if (listPieceInfo[0] === undefined) {
                    return <div style={tile.box_style}></div>
                } else {
                    return <div style={tile.box_style}>{this.get_piece_picture(listPieceInfo[0].letter, 100)}</div>
                }
            })
            return some_tiles;
        })
        return all_tiles
    }
}

export default ChessBoard;