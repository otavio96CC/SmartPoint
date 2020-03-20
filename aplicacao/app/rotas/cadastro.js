module.exports = function(aplicacao){

    aplicacao.get('/endereco', (request, response, next)=>{

        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.cadastroFuncionarioModel;

        return cadastro.getCadastro(conexao).then(success => {
            return response.send({funcionarios: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
      
    aplicacao.post('/endereco', (request, response, next)=>{
        let cadastro = request.body;

        let conexao = aplicacao.config.dbConexao();
        let cadastrarFuncionario = aplicacao.app.modelos.cadastroFuncionarioModel;
        
        return cadastrarFuncionario.setCadastro(cadastro, conexao).then(success => {
            return response.send({cadastros: success});
        }).catch(error => {
            next({erro : error.sqlMessage});
        });
    });

    aplicacao.post('/empresaCreate',(request, response, next)=>{
        let cadastro = request.body;

        let conexao = aplicacao.config.dbConexao();
        let cadastrarEmpresa = aplicacao.app.modelos.empresaModel;

        return cadastrarEmpresa.setEmpresa(cadastro, conexao).then(success => {
            return response.send({empresa: success});
        }).catch(error => {
            next({erro : error.sqlMessage});
        });
    });
    aplicacao.get('/empresaRead', (request, response, next)=>{

        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.empresaModel;

        return cadastro.getEmpresa(conexao).then(success => {
            return response.send({funcionarios: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
}