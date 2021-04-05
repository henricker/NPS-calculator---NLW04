import Router from 'express';
import { UserController } from '../app/controllers/UserController';

const userRouter = Router();
const userController = new UserController();


userRouter.post('/users', userController.create);

export { userRouter };