console.clear();

// TS Node DEV: TSC (conversão TS para JS + NODEMON que executa ao salvar)
// Repositorio > persistência e ROutes
// import './database';//Conexão com o Banco de Dados





import 'reflect-metadata';

import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';//Approuch de Fazer Middlewares de errors > precisa desse pacote
import cors from 'cors';


import routes from './routes';// por default acho que vai no index
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import '@shared/infra/typeorm';
import '@shared/container';


const app = express();

//Proteção dos dados: evita que outros sites acessem do backend 
// app.use(cors({
//     origin:'https://usahduhasuhd'  //ASSIM: permite apenas que FrontEnds com um localhost específico acesse o backend
// }));

//Só funcio para requisicoes a partir do Browser > ai nao restringe pelo Insomnia e Mobile
app.use(cors());


app.use(express.json());
//criando rota para arquivos!!! (abre e aparece o arquivo)
//Exemplo:
//http://localhost:3333/files/ae070f9f4addc7a5c231-CV%20Gabriel%20Rodrigues%20%20-%2027-05-2020.pdf
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(errors());//tem que ser o ultimo!!!


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    //err instanceof AppError > instancia Gerada pela aplicacao > erro que eu conheco!! > que estava de acorod com o trycatch
    // erros: em vez que ficar nas rotas, vai de services direto para o server sem para em rotas 
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
});



app.listen(3333, () => {
    console.log('🚀 Server started on port 3333');
});

