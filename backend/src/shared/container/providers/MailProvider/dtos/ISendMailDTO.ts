import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParceMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISerndMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
