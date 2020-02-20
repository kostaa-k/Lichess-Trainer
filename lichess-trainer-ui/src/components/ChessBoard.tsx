import React, { Component } from 'react';
import { SquareBoxType, PieceType } from './models';
import defaultLineup from '../defaultLineup';
import { tileInitialSetup, initializePieces, renderPieces } from './utils';

let tiles: SquareBoxType[][] = [];
let currentPieces: PieceType[] = [];

export class ChessBoard extends Component {
    componentWillMount() {
        tiles = tileInitialSetup();
        currentPieces = initializePieces();
    }

    render() {
        console.log(tiles);
        const all_tiles = tiles.map(tileRow => {
            const some_tiles = tileRow.map(tile => {
                let listPieceInfo = currentPieces.filter(piece => piece.currentSquare.xCord === tile.xCord && piece.currentSquare.yCord === tile.yCord);

                if (listPieceInfo[0] === undefined) {
                    return <div style={tile.tileStyle}></div>
                } else {
                    return <div style={tile.tileStyle}>{renderPieces(listPieceInfo[0].letter, 100)}</div>
                }
            })
            return some_tiles;
        })
        return all_tiles
    }
}

export default ChessBoard;