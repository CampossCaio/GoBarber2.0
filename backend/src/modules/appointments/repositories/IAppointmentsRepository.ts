import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllinMonthFromProviderDTO from '../dtos/IFindAllinMonthFromProviderDTO';
import IFindAllinDayFromProviderDTO from '../dtos/IFindAllinDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllMonthFromProvider(
    data: IFindAllinMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllinDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
