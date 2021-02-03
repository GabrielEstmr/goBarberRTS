import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    tmpFolder: tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),//adicionando uploads no final

    // Salvando imagens no proprio caminho da aplicação > depois vai usar serviços de upload (AWS S3 por exemplo)
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('HEX');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};