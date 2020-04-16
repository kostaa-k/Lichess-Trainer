import { Button } from 'semantic-ui-react'
import axios from 'axios';
import { initialize_pieces} from '../components/ChessBoard'
import React from 'react';
import { ConnectedProps } from 'react-redux';
import { connector } from './buttons-connect';

// export class Buttons extends Component{
//     render(){
//         return <Button onClick={getBoard}>Click Here</Button>
//     }
// }

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    
}

export const Buttons = (props: Props) => (
    <Button onClick={props.updateBoard}>Update Board</Button>
)

export default connector(Buttons)

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