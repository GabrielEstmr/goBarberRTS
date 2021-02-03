import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import { isNormalToken } from 'tsyringe';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        //fs.promises > para trabalha com o fs como se fosse promise
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );

        return file;

    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(filePath);//Page Informações do Arquivo > da erro de nao ha arquivo
        } catch {
            return;
        };

        await fs.promises.unlink(filePath);//Deletando o arquivo

    }
}


export default DiskStorageProvider;


// Caralho!!! Eu fiz muitos teste mas estou achando que realmente o teclado nao foi uma boa compra =(

// O que tentar Fazer: Tentar trocar o Teclado e ver se o outro da multilaser é melhor ()

