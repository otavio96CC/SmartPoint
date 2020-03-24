module.exports = function(aplicacao){

    aplicacao.get('/endereco', (request, response, next)=>{

        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.funcionarioModel;

        return cadastro.getCadastro(conexao).then(success => {
            return response.send({funcionarios: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
      
    aplicacao.post('/endereco', (request, response, next)=>{
        let cadastro = request.body;

        let conexao = aplicacao.config.dbConexao();
        let cadastrarFuncionario = aplicacao.app.modelos.funcionarioModel;
        
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
    aplicacao.post('/pontoCreate', (request, response, next)=>{
        let ponto = request.body;

        let conexao = aplicacao.config.dbConexao();
        let cadastrarPonto = aplicacao.app.modelos.pontoModel;

        return cadastrarPonto.setPonto(ponto, conexao).then(success => {
            return response.send({ponto: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
    aplicacao.get('/pontoRead', (request, response, next)=>{

        let conexao = aplicacao.config.dbConexao();
        let ponto = aplicacao.app.modelos.pontoModel;

        return ponto.getPonto(conexao).then(success => {
            return response.send({pontos: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
    aplicacao.post('/ajusteCreate', (request, response, next)=>{
        let ajuste = request.body;
        let conexao = aplicacao.config.dbConexao();
        let cadastrarAjuste= aplicacao.app.modelos.ajusteModel;

        return cadastrarAjuste.setAjuste(ajuste, conexao).then(success => {
            return response.send({ajuste: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
    aplicacao.get('/ajusteRead', (request, response, next)=>{
        let conexao = aplicacao.config.dbConexao();
        let cadastrarAjuste= aplicacao.app.modelos.ajusteModel;

        return cadastrarAjuste.getAjuste(conexao).then(success => {
            return response.send({ajuste: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
}