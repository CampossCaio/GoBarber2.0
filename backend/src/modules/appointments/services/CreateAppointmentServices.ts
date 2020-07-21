import Appointment from '../infra/typeorm/entities/Appointment';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
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

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
