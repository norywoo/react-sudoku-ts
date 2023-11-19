// src/Board.tsx
import React, { useState, ChangeEvent } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Board.css';
import { isJSDocReadonlyTag } from 'typescript';

interface BoardProps {}

const initialBoard: number[][] = [
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
const origBoard: number[][] = JSON.parse(JSON.stringify(initialBoard)); // deep copy

const Board: React.FC<BoardProps> = () => {
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const handleCellChange = (row: number, col: number, value: string) => {
    const newBoard = [...board];
    newBoard[row][col] = parseInt(value) || 0;
    setBoard(newBoard);
  };

  // DEBUG: TODO remove
  const handleCellClick = (row: number, col: number) => {
    console.log(row, col);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            {board.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <Col key={colIndex}>
                    <Form.Control
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
                    />
                  </Col>
                ))}
              </Row>
            ))}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Board;
