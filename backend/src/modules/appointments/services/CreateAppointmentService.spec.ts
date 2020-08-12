import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentServices from './CreateAppointmentServices';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentServices: CreateAppointmentServices;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentServices = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    const appointment = await createAppointmentServices.execute({
      date: new Date(2020, 7, 10, 13),
      provider_id: '12121212',
      user_id: 'user',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12121212');
  });

  it('should not be able to create a new appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 7, 10, 13);

    const appointment = await createAppointmentServices.execute({
      date: appointmentDate,
      provider_id: '12121212',
      user_id: 'user',
    });

    expect(
      createAppointmentServices.execute({
        date: appointmentDate,
        provider_id: '12121212',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appoitment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 7, 10, 11),
        provider_id: '12121212',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appoitment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 7, 10, 13),
        provider_id: '12121212',
        user_id: '12121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should only be able to create an appoitment between 8am to 6pm.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 7, 11, 7),
        provider_id: '12121212',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointmentServices.execute({
        date: new Date(2020, 7, 11, 18),
        provider_id: '12121212',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
