import { Button } from 'semantic-ui-react'
import axios from 'axios';
import React, { Component } from 'react';

export class Buttons extends Component{
    
    render(){

        return <Button onClick={button_clicked}>Click Here</Button>
    }

}

export function button_clicked(){
    getBoard();
}

export function getBoard() {
    axios.get(`http://localhost:5000/example_endpoint`)
        .then(response => {
            console.log(response);
        })
}

export default Buttons