// src/Board.tsx
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Board.css';
import Timer from './Timer';


interface BoardProps {}

const initialBoard1: number[][] = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// for debugging final plot
const initialBoard2: number[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 0, 3, 0, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 2, 8, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const debug = false; //true;
const initialBoard = debug ? initialBoard2 : initialBoard1;

const origBoard: number[][] = JSON.parse(JSON.stringify(initialBoard)); // deep copy

interface CheckResult {
  invalid: boolean;
  reason: string;
  info: { row: number, col: number };
}

function checkPlot(board: number[][], row: number, col: number, value: string): CheckResult {
  const noConflict = { invalid: false, reason: '', info: { row:-1, col:-1 } };
  const val = parseInt(value) || 0;

  if (val === 0) {
    return noConflict;
  }

  // check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === val && i !== col) {
      return { invalid: true, reason: 'row', info: { row:row, col:i } };
    }
  }

  // check col
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === val && i !== row) {
      return { invalid: true, reason: 'col', info: { row:i, col:col } };
    }
  }

  // check subgrid
  const subgridRow = Math.floor(row / 3) * 3;
  const subgridCol = Math.floor(col / 3) * 3;
  for (let i = subgridRow; i < subgridRow + 3; i++) {
    for (let j = subgridCol; j < subgridCol + 3; j++) {
      if (board[i][j] === val && i !== row && j !== col) {
        return { invalid: true, reason: '3x3', info: { row:i, col:j } };
      }
    }
  }

  return noConflict;
}

function showConflict(check: CheckResult) {
  const cell = document.getElementById(`cell-${check.info.row}-${check.info.col}`) as HTMLInputElement;
  cell.classList.add('conflict');
  setTimeout(() => {
    cell.classList.remove('conflict');
  }, 2000);
}

function checkGameCompleted(board: number[][]) {
  let completed = true;
  for (let i = 0; i < 9; i++) {
    if (board[i].includes(0)) {
      completed = false;
      break;
    }
  }
  if (completed) {
    return true;
  }
}

const Congrats: React.FC<{show: boolean}> = ({show}) => {
  return show ? (
    <div className={show ? 'congrats' : 'congrats hidden'}>
      <h1 style={{color: 'darkred'}}>Congratulations!</h1>
    </div>
  ) : null;
}

const Board: React.FC<BoardProps> = () => {
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [completed, setCompleted] = useState<boolean>(false);
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const handleCellChange = (row: number, col: number, value: string) => {
    const check = checkPlot(board, row, col, value);
    if (check.invalid) {
      showConflict(check);
      return;
    }
    const newBoard = [...board];
    newBoard[row][col] = parseInt(value) || 0;
    setBoard(newBoard);
    if (checkGameCompleted(newBoard)) {
      setCompleted(true);
      console.log('Hohoho! Game completed!');
    }
  };

  const handleCellClick = (row: number, col: number) => {
    setFocusedCell({ row, col });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    console.log(focusedCell);

    if (!focusedCell) return;

    let newRow = focusedCell.row;
    let newCol = focusedCell.col;

    switch (event.key) {
      case 'ArrowUp':
        newRow = Math.max(0, newRow - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(8, newRow + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, newCol - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(8, newCol + 1);
        break;
      default:
        return;
    }
    console.log(newRow, newCol);
    setFocusedCell({ row: newRow, col: newCol });
  };

  return (
    <Container>
      <Timer stop={completed} />
      <Row>
        <Col>
          <Form>
            {board.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <Col key={colIndex}>
                    <Form.Control
                      id = {`cell-${rowIndex}-${colIndex}`}
                      type="text"
                      maxLength={1}
                      value={cell === 0 ? '' : cell.toString()}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                      readOnly={origBoard[rowIndex][colIndex] !== 0}
                      className={
                        origBoard[rowIndex][colIndex] !== 0
                        ? 'readonly'
                        : cell === 0 ? 'empty' : 'editable'
                      }
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onKeyDown={handleKeyDown}
                    />
                  </Col>
                ))}
              </Row>
            ))}
          </Form>
        </Col>
      </Row>
      <Congrats show={completed} />
    </Container>
  );
};




export default Board;
