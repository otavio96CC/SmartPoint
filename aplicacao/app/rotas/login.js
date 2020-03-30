let JWT = require('jsonwebtoken');

module.exports = function(aplicacao){
    aplicacao.post('/login', (request, response, next)=>{
        let login = request.body;
        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.funcionarioModel;

        return cadastro.login(login, conexao).then(success => { 
            JWT.sign({
                userID: success[0].nome_funcionario,
                userMatricula: success[0].matricula_funcionario,
                userCPF: success[0].cpf_funcionario,
                userPermissao: success[0].permissao_funcionario,
                exp: Math.floor(Date.now() / 1000) + 3600
            }, 'otavio', {algorithm: 'HS256'}, (error, token)=>{
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
    });
}