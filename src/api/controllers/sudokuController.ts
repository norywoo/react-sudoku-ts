// controllers/sudokuController.ts
import { Request, Response } from 'express';
import axios from 'axios';

export const getSudoku = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get('https://external-api.com/sudoku');
    const sudokuData = response.data;
    res.json(sudokuData);
  } catch (error) {
    console.error('Error fetching Sudoku data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

