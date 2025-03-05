import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/admin/api', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});
app.get('/api/auth/')
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});