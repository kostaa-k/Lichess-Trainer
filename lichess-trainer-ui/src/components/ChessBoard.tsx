import React, { Component } from 'react';

export type ChessBoardProps = {
    rows: Number,
    columns: Number
}

export class ChessBoard extends Component<ChessBoardProps> {
    constructor(props: ChessBoardProps) {
        super(props);
    }


    render() {
        return (
            <table>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
            </table>
        )
    }
}