// src/App.tsx
import React from 'react';
import Board from './Board';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku</h1>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;
