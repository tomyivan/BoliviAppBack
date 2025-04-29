import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import { rPublic } from './routes/public.routes';
import { rDependences, rEvent, rResource, rSponsor, rPoliticalParty,
  rPresident
 } from './infraestructure';
import path from 'path';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const app = express();
const port = process.env.PORT || 3000;
const pathPublic = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(pathPublic));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/api/v1', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});
app.use('/api/v1/p/', rPublic)
app.use('/api/v1/dependences', rDependences)
app.use('/api/v1/events', rEvent)
app.use('/api/v1/resource', rResource)
app.use('/api/v1/sponsor', rSponsor)
app.use('/api/v1/politicalParty', rPoliticalParty)
app.use('/api/v1/president', rPresident)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});