//Adicionando propriedades às Bibliotecas
// ".d.ts" > EXTENSÂO de Declaração de Tipos da Bibliotecas
// NAO È SUBSTITUIÇÂO >>>>> È UM MERGE

declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}
