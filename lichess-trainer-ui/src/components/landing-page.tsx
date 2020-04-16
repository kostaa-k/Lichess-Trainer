
import React from 'react';
import Board from './../board/board-component';
import Buttons from '../buttons/buttons-component';

export class ChessBoardLandingPage extends React.Component {
    componentWillMount() {
    }

    render() {
        return (
            <div>
                <Board />
                <Buttons />
            </div>
        )
    }
}