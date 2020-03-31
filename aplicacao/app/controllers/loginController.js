let JWT = require('jsonwebtoken');
let crypto = require("crypto");

module.exports = function(aplicacao){
    this.login = (request, response, next)=>{
        let login = request.body;
        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.funcionarioModel;
        let JWTSECRET = aplicacao.util.config.config;
        let secret = aplicacao.util.config.config;

        let hash = crypto.createHmac('sha256', secret[server].secret).update(login.senha).digest('base64');
        login.senha = hash;

        return cadastro.login(login, conexao).then(success => { 
            JWT.sign({
                userID: success[0].nome_funcionario,
                userMatricula: success[0].matricula_funcionario,
                userCPF: success[0].cpf_funcionario,
                userPermissao: success[0].permissao_funcionario,
                exp: Math.floor(Date.now() / 1000) + 3600
            }, JWTSECRET[server].jwtSecret, {algorithm: 'HS256'}, (error, token)=>{
                if(error){
                    throw error;
                }
                //local storage
                return response.send({
                    funcionario: success.mensagem,
                    token
                });
            });    
        }).catch( error => {
            next(error);
        });
    }
}