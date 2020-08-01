import { Router } from 'express';

import appointementsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/appointments', appointementsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/password', passwordRouter);

export default routes;
