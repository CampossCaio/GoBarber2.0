import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointementsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointementsRouter.use(ensureAuthenticated);

//SoC: Separation of Concerns (Ceparação de Preocupações);

// appointementsRouter.get('/', async (request, response) => {
//   const appointments = await appointementsRepository.find();
//   return response.json(appointments);
// });

appointementsRouter.post('/', celebrate({
[Segments.BODY]: {
  provider_id: Joi.string().uuid().required(),
  date: Joi.date(),
}
}),appointmentsController.create);
appointementsRouter.get('/me', providerAppointmentsController.index);

export default appointementsRouter;
