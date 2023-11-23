// src/App.tsx
import Board from './Board/Board';
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
