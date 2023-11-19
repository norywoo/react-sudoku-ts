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

const Board: React.FC<BoardProps> = () => {
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [cnt, setCnt] = useState<number>(0);

  const handleCellChange = (row: number, col: number, value: string) => {
    const newBoard = [...board];
    newBoard[row][col] = parseInt(value) || 0;
    setBoard(newBoard);
    setCnt(cnt + 1);
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
                      readOnly={cell !== 0} // 数が入っているセルは読み取り専用にする
                      className={(cell !==0) ? 'readonly' : 'editable'}
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
