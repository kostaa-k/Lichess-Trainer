import React from 'react';
import './App.css';

import ChessBoard from './components/ChessBoard'
import Buttons from './buttons/buttons-component'

function App() {
  return (
    <div> 
      <ChessBoard />
      <Buttons />
    </div>
  );
}

export default App;
