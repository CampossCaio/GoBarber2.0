import Appointment from '../infra/typeorm/entities/Appointment';
import { startOfHour, isBefore, getHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 * S: single Responsability Principle
 * 0:
 * L:
 * I:
 * D: Dependency Invertion Principle
 */
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(Date.now(), appointmentDate)) {
      throw new AppError("You can't create an appointments on past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create  an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only to create an appoitment between 8am and 6pm.',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
