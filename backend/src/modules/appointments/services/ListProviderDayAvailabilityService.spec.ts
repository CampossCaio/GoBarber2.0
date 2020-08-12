import 'reflect-metadata';
import ListProvidersDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProvidersDayAvailabilityService;

describe('ListProvidersdayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDayAvailability = new ListProvidersDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 7, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 7, 7, 15, 0, 0),
    });

    // Modifica o método now para que ele retorne a hora atual somada a 2 horas.
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 7, 11).getTime();
    });

    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'user',
      day: 7,
      year: 2020,
      month: 8,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 13, available: true },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
