import { Router, response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointementsRouter = Router();

appointementsRouter.use(ensureAuthenticated)

//SoC: Separation of Concerns (Ceparação de Preocupações);

appointementsRouter.get('/', async (request, response) => {
  const appointementsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointementsRepository.find();
  return response.json(appointments);
})

appointementsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id
  });

  return response.json(appointment);

});

export default appointementsRouter;
