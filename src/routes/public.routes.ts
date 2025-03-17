import express from 'express';
import { rAuth } from '../infraestructure';
const rPublic = express();
rPublic.use('/auth', rAuth);
export {
    rPublic
}