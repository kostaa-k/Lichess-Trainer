import { Button } from 'semantic-ui-react'
import axios from 'axios';
import {ChessBoard, initialize_pieces} from './ChessBoard'
import React, { Component } from 'react';


export class Buttons extends Component{
    
    render(){
        return <Button onClick={button_clicked}>Click Here</Button>
    }
}

export function button_clicked(){
    getBoard();
    console.log("Changing board");
    initialize_pieces(false);
}

export function getBoard() {
    axios.get(`http://localhost:5000/example_endpoint`)
        .then(response => {
            console.log(response);
        })
}

export default Buttons