
import IMailTemplateProvider from '../models/ImailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'uahuah';
    };
};

export default FakeMailTemplateProvider;