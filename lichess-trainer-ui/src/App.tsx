import React from 'react';
import logo from './logo.svg';
import './App.css';

import ChessBoard from './components/ChessBoard'
import {Buttons} from './components/Buttons'

function App() {
  return (
    <div> 
    <ChessBoard/>
    <Buttons />
    </div>
  );
}


export default App;
