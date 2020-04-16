import React from 'react';
import { ConnectedProps } from 'react-redux';
import { connector } from './board-connect';
import { square_box, setup, a_piece, get_piece_picture, initialize_pieces } from '../components/ChessBoard'

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
}

export const Board = (props: Props) => {
    return (
        <div>
            {
                setup().map(tileRow => {
                    tileRow.map(tile => {
                        const board = initialize_pieces(true)
                        let listPieceInfo = board.filter(piece => piece.current_square.x_cord === tile.x_cord && piece.current_square.y_cord === tile.y_cord);
                        if (listPieceInfo[0] === undefined) {
                            return <div style={tile.box_style}></div>
                        } else {
                            return <div style={tile.box_style}>{get_piece_picture(listPieceInfo[0].letter, 100)}</div>
                        }
                    })
                })

            }
        </div>
    )
}

export default connector(Board)