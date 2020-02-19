import React, { Component } from 'react';
import { SquareBoxType, PieceType } from './models';
import { TileStyle } from './styles';
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
import defaultLineup from '../defaultLineup';

let tiles: SquareBoxType[][] = [];
let currentPieces: PieceType[] = [];

export class ChessBoard extends Component {

    isEven = (number: number) => {
        return number % 2 == 0;
    }

    tileInitialSetup = () => {
        let count = 0;
   
        for (let y = 0; y < 8; y++) {
            let rowTiles: SquareBoxType[] = [];
            const marginFromTop = y * 100 / 8;
            count += 1

            for (let x = 0; x < 8; x++) {
                let currentStyle = Object.assign({backgroundColor: '#f0d9b5', marginFromTop}, TileStyle); // colour is white

                if (this.isEven(count)) {
                    currentStyle = Object.assign({backgroundColor: '#b58863', marginFromTop}, TileStyle) // colour is black
                }

                rowTiles.push({ xCord: x, yCord: y, tileStyle: currentStyle })
                count += 1
            }

            tiles.push(rowTiles)
        }
    }

    getDefaultLineup = () => defaultLineup.slice()

    getStringPosition(letter: String, number: number): SquareBoxType {
        const x_cord = letter.charCodeAt(0) - 97;
        const y_cord = 8 - number;

        return tiles[y_cord][x_cord]
    }

    initializePieces() {
        const defaultLineup = this.getDefaultLineup()
        currentPieces = [];

        defaultLineup.map(item => {
            currentPieces.push({
                uniqueId: "hello",
                currentSquare: this.getStringPosition(
                    item.split("@")[1].charAt(0),
                    Number(item.split("@")[1].charAt(1))
                ),
                letter: item.split('@')[0],
            })
        });
    }

    renderPiece(letter: String, size: Number) {
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

    componentWillMount() {
        this.tileInitialSetup();
        this.initializePieces();
    }

    render() {
        console.log(tiles);

        const all_tiles = tiles.map(tileRow => {
            const some_tiles = tileRow.map(tile => {
                let listPieceInfo = currentPieces.filter(piece => piece.currentSquare.xCord === tile.xCord && piece.currentSquare.yCord === tile.yCord);

                if (listPieceInfo[0] === undefined) {
                    return <div style={tile.tileStyle}></div>
                } else {
                    return <div style={tile.tileStyle}>{this.renderPiece(listPieceInfo[0].letter, 100)}</div>
                }
            })
            return some_tiles;
        })
        return all_tiles
    }
}

export default ChessBoard;