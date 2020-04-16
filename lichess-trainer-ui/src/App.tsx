import React from 'react';
import './App.css';

// import ChessBoard from './components/ChessBoard'
import Buttons from './buttons/buttons-component'
import Board from './board/board-component';
import { ChessBoardLandingPage } from './components/landing-page';

function App() {
  return (
    <div> 
      <ChessBoardLandingPage />
    </div>
  );
}

export default App;
