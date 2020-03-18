// definir rotas ainda
var uuid = require('uuid');

module.exports = function(aplicacao){

    aplicacao.get('/endereco', function(request, response){
        let conexao = aplicacao.config.dbConexao()
        let cadastro = aplicacao.app.modelos.enderecoModel

        cadastro.getEndereco(conexao, (error, result)=>{
            response.send({enderecos : result})
        })
    })

    aplicacao.post('/endereco', (request, response)=>{
        let cadastroEndereco = request.body
        let conexao = aplicacao.config.dbConexao()
        let cadastro = aplicacao.app.modelos.enderecoModel
        cadastroEndereco.id_endereco = uuid.v4();

        cadastro.setEndereco(cadastroEndereco, conexao, (error, result)=>{
           // cadastro.getEndereco(conexao, (error, result)=>{
                response.send({enderecos : result})
            //})	
        })
    })
}

