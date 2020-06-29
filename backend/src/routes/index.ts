import { Router } from 'express';


import appointementsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionRouter from './session.routes';

const routes = Router();

routes.use('/appointments', appointementsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
