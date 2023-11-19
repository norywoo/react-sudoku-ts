// server.ts
import express from 'express';
import sudokuRouter from './routes/sudokuRouters';

const app = express();
app.use(express.json());

// Set CORS headers - this allows Cross-Origin Resource Sharing from any domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const PORT = process.env.PORT || 5000;

app.use('/api/sudoku', sudokuRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

