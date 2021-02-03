

class Error {
    public readonly message: string;

    public readonly statusCode: number;

    //statusCode=400 > ao declarar numero já entende que é tipo number
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default Error;


// nao consegue pegar erro e setar msg
// error.message = "setando msg"



//Apenas para a ROTA (requisição/resposta) > outros> vao gerar outras classes de erros