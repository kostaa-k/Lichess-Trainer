import React from 'react';
import { SquareBoxType, PieceType } from './models';
import defaultLineup from '../defaultLineup';
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
import { TileStyle } from './styles';

export const isEven = (number: number): boolean => { return ( number % 2 === 0)};

export const getDefaultLineup = (): string[] => defaultLineup.slice()

export function tileInitialSetup(): SquareBoxType[][] {
    let count = 0;
    let tiles: SquareBoxType[][] = [];

    for (let y = 0; y < 8; y++) {
        let rowTiles: SquareBoxType[] = [];
        const marginFromTop = y * 100 / 8;
        count += 1

        for (let x = 0; x < 8; x++) {
            let currentStyle = Object.assign({backgroundColor: '#f0d9b5', marginFromTop}, TileStyle); // colour is white

            if (isEven(count)) {
                currentStyle = Object.assign({backgroundColor: '#b58863', marginFromTop}, TileStyle) // colour is black
            }

            rowTiles.push({ xCord: x, yCord: y, tileStyle: currentStyle })
            count += 1
        }

        tiles.push(rowTiles)
    }

    return tiles;
}

export function getStringPosition(letter: String, number: number): SquareBoxType {
    const xCord = 8 - number;
    const yCord = letter.charCodeAt(0) - 97;
    const tiles = tileInitialSetup();

    return tiles[xCord][yCord]
}

export function initializePieces(): PieceType[] {
    const defaultLineup = getDefaultLineup()
    let currentPieces: PieceType[] = [];

    defaultLineup.map(item => {
        currentPieces.push({
            uniqueId: "hello",
            currentSquare: getStringPosition(
                item.split("@")[1].charAt(0),
                Number(item.split("@")[1].charAt(1))
            ),
            letter: item.split('@')[0],
        })
    });

    return currentPieces;
}

export function renderPieces(letter: String) {
    switch (letter) {
        //WHITE PIECES
        case 'P':
            return <img src={WhitePawn} id="piece"/>
        case 'R':
            return <img src={WhiteRook} id="piece"/>
        case 'N':
            return <img src={WhiteKnight} id="piece"/>
        case 'B':
            return <img src={WhiteBishop} id="piece"/>
        case 'Q':
            return <img src={WhiteQueen} id="piece"/>
        case 'K':
            return <img src={WhiteKing} id="piece"/>

        //BLACK PIECES
        case 'p':
            return <img src={BlackPawn} id="piece"/>
        case 'r':
            return <img src={BlackRook} id="piece"/>
        case 'n':
            return <img src={BlackKnight} id="piece" />
        case 'b':
            return <img src={BlackBishop} id="piece"/>
        case 'q':
            return <img src={BlackQueen} id="piece"/>
        case 'k':
            return <img src={BlackKing} id="piece"/>
    }
}