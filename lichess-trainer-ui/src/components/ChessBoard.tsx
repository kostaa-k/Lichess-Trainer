import React, { Component } from 'react';
import CSS from 'csstype';
import BlackKnight from '../pieces/BlackKnight';
import BlackBishop from '../pieces/BlackBishop';
import BlackRook from '../pieces/BlackRook';
import BlackKing from '../pieces/BlackKing';
import BlackQueen from '../pieces/BlackQueen';
import BlackPawn from '../pieces/BlackPawn';
import WhiteKnight from '../pieces/WhiteKnight';
import WhiteBishop from '../pieces/WhiteBishop';
import WhiteRook from '../pieces/WhiteRook';
import WhiteKing from '../pieces/WhiteKing';
import WhiteQueen from '../pieces/WhiteQueen';
import WhitePawn from '../pieces/WhitePawn';
import { all } from 'q';

const Draggable = require('react-draggable')
const defaultLineup = require('../defaultLineup')
const pieceComponents = require('../pieces')
const decode = require('./decode')


const getDefaultLineup = () => defaultLineup.slice()

type square_box = {
    x_cord: Number,
    y_cord: Number,
    //unique_id: String,
    box_style: CSS.Properties,
    //piece_inside: a_piece
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
    //width: '100px',
    paddingBottom: squareSize,
    float: 'left',
    position: 'relative',
    pointerEvents: 'none',
    height: squareSize,
  }

let tiles: square_box[][];

let piece_objects: a_piece[];

export class ChessBoard extends Component{

    setup() {

        tiles = []

        let count = 0

        let temp_Square_tiles: square_box[];

        //const word_array = ["a", "b", "c", "d", "e", "f", "g", "h"]
        for(let y=0; y<8 ;y++){
            count = count+1
            
            temp_Square_tiles = []
            for(let x=0;x<8;x++){
                const unique_id = 10*y+x

                //const corresponding_letter = word_array[x]

                const boxShadow = undefined

                //colour is white
                let backgroundColor = '#f0d9b5'
                if(count%2 == 0){
                    backgroundColor = '#b58863'
                    //colour is black
                }
                const top=y*square
                
                const this_style = Object.assign({backgroundColor, top}, box_style)
                
                const null_piece = {}
                const temp_square = {x_cord: x, y_cord: y, box_style:this_style}


                count = count+1

                temp_Square_tiles.push(temp_square)
            }

            tiles.push(temp_Square_tiles)
        }
    }

    get_piece_picture(letter: String){
        switch(letter){
            //WHITE PIECES
            case("P"):
                return WhitePawn
            case("R"):
                return WhiteRook
            case("N"):
                return WhiteKnight
            case("B"):
                return WhiteBishop
            case("Q"):
                return WhiteQueen
            case("K"):
                return WhiteKing
            //BLACK PIECES

            case("p"):
                return BlackPawn
            case("r"):
                return BlackRook
            case("n"):
                return BlackKnight
            case("b"):
                return BlackBishop
            case("q"):
                return BlackQueen
            case("k"):
                return BlackKing

        }
    }

    decode_str_position(letter: String, the_num: number){
        const input= "a7"

        const x_cord = letter.charCodeAt(0) - 97;
        const y_cord = 8-the_num;

        return tiles[y_cord][x_cord]
    }

    componentWillMount() {
        this.setup();
        this.initialize_pieces();
    }

    initialize_pieces(){

        piece_objects = []

        const these_pieces = getDefaultLineup()
        
        for(let i = 0;i<these_pieces.length;i++){
            const piece_str = these_pieces[i];
            const position_str = piece_str.split(["@"])[1]
            const the_letter = position_str.charAt(0);
            const the_num_pos = Number(position_str.charAt(1));

            const piece_name = piece_str.split(["@"])[0];

            //{x_cord: x, y_cord: y, box_style:this_style}

            const piece_object = {unique_id: "hello", current_square:this.decode_str_position(the_letter, the_num_pos), letter:piece_name};
            //const piece_pic = this.get_piece_picture(piece_name)

            piece_objects.push(piece_object);
        }
    }

    render() {

        // for(let i =0;i<piece_objects.length;i++){
        //     console.log(piece_objects[i]);
        // }

        // for(let i =0;i<tiles.length;i++){
        //     for(let x=0;x<tiles[0].length;x++){
        //         console.log(tiles[i][x]);
        // }

        const all_tiles  = tiles.map(tileRow =>{
            tileRow.map(tile => {
                let listPieceInfo = piece_objects.filter(piece => piece.current_square.x_cord === tile.x_cord && piece.current_square.y_cord === tile.y_cord);
                // let pieceLetter = this.get_piece_picture(listPieceInfo[0].letter);
                if (listPieceInfo[0] === undefined) {
                    return <div style={tile.box_style}></div>
                } else {
                    return <div style={tile.box_style}>{BlackBishop()}</div>
                }
            })
        })
        console.log(all_tiles)
        return all_tiles
    }
}

export default ChessBoard;