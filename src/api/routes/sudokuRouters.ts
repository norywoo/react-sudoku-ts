// routes/sudokuRoutes.ts
import { Router } from 'express';
import { getSudoku } from '../controllers/sudokuController';

const sudokuRouter = Router();

sudokuRouter.get('/', getSudoku);

export default sudokuRouter

