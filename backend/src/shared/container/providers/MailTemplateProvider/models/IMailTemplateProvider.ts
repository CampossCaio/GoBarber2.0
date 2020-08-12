import IParceMailTemplateDTO from '../dtos/IParceMailTemplateDTO';

export default interface IMailTemplateProviver {
  parse(data: IParceMailTemplateDTO): Promise<string>;
}
