import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/modules/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}-${year}-${month}-${day}`;
    let appoitments = await this.cacheProvider.recover<Appointment[]>(cacheKey);
    //let appoitments;
    if (!appoitments) {
      appoitments = await this.appointmentsRepository.findAllInDayFromProvider({
        day,
        month,
        provider_id,
        year,
      });
      await this.cacheProvider.save(cacheKey, classToClass(appoitments));
    }

    return appoitments;
  }
}

export default ListProviderAppointmentsService;
