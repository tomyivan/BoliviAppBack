import express from 'express';
import { rAuth, rCity } from '../infraestructure';
const rPublic = express();
rPublic.use('/auth', rAuth);
rPublic.use('/city', rCity);
export {
    rPublic
}