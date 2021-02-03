import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTO from '../dto/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/ImailTemplateProvider';

class HandlerMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {

        const templeteFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' });//utf-8 para entender acestos do portugues
        const parseTemplate = handlebars.compile(templeteFileContent);

        return parseTemplate(variables);
    }
};

export default HandlerMailTemplateProvider;