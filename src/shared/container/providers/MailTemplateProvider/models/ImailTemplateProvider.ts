import IParseMailTemplateDTO from '../dto/IParseMailTemplateDTO';
import IparsedMailTemplateDTO from '../dto/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDTO): Promise<string>;
}