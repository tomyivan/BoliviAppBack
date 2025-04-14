import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import { rPublic } from './routes/public.routes';
import { rDependences, rEvent } from './infraestructure';
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/api/v1', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});
// app.use('/api/v1/a/')
// app.use('/api/v1/o/')
app.use('/api/v1/p/', rPublic)
app.use('/api/v1/dependences', rDependences)
app.use('/api/v1/events', rEvent)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});