import Router from 'express';
import { NPSController } from '../app/controllers/NPScontroller';

const NPSrouter = Router();

const NPScontroller = new NPSController();

NPSrouter.get('/nps/:survey_id', NPScontroller.execute);

export { NPSrouter };