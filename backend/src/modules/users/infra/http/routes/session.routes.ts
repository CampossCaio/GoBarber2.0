import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();
const sessionscontroller = new SessionsController();

sessionRouter.post('/', sessionscontroller.create);

export default sessionRouter;
