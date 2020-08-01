import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentServices from './CreateAppointmentServices';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentServices = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentServices.execute({
      date: new Date(),
      provider_id: '12121212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12121212');
  });

  it('should not be able to create a new appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentServices = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointmentServices.execute({
      date: appointmentDate,
      provider_id: '12121212',
    });

    expect(
      createAppointmentServices.execute({
        date: appointmentDate,
        provider_id: '12121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
