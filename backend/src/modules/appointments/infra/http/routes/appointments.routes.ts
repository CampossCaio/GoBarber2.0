import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';
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

appointementsRouter.post('/', appointmentsController.create);
appointementsRouter.get('/me', providerAppointmentsController.index);

export default appointementsRouter;
  