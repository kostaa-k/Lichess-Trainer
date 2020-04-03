import React, { Component } from 'react';
import { SquareBoxType, PieceType } from '../internal/models/ChessBoardModel';
import { tileInitialSetup, initializePieces, renderPieces } from '../internal/actions/ChessBoardAction';

let tiles: SquareBoxType[][] = [];
let currentPieces: PieceType[] = [];

export class ChessBoard extends Component {
    componentWillMount() {
        tiles = tileInitialSetup();
        currentPieces = initializePieces();
    }

    render() {
        return tiles.map(tileRow => {
            return tileRow.map(tile => {
                let listPieceInfo = currentPieces.filter(piece => piece.currentSquare.xCord === tile.xCord && piece.currentSquare.yCord === tile.yCord);

                if (listPieceInfo[0]) {
                    return <div style={tile.tileStyle}>{renderPieces(listPieceInfo[0].letter)}</div>
                } else {
                    return <div style={tile.tileStyle}></div>
                }
            });
        });
    }
}

export default ChessBoard;