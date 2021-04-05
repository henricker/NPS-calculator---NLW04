import Router from 'express';
import { SendMailController } from '../app/controllers/SendMailController';
import { AnswerController } from '../app/controllers/AnswerController';


const mailRouter = Router();

const sendMailController = new SendMailController();
const answerController = new AnswerController();

mailRouter.post('/sendMail', sendMailController.execute);
mailRouter.get('/answers/:value', answerController.execute);
export { mailRouter };