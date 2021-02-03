import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    //Validação do token JWT
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is missing.", 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);


        const { sub } = decoded as ITokenPayload;//pegando sub de decoded

        //Adicionando o Id do usuário (decoded.user) para TODAS as rotas que utilizam o <<<ensureAuthenticated>>>
        request.user = {
            id: sub,
        };


        console.log(decoded);
        // {
        //     iat: 1610914306,//quando token foi gerado
        //     exp: 1611000706,//quando expira
        //     sub: '568cd99e-f26b-4674-afa7-4bfed58144bb' //subjet > quando usuário gerou o token
        // }
        return next();
    } catch {
        throw new AppError("Invalid JWT token.", 401);
    }
}