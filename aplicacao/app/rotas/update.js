module.exports = function(aplicacao){
    //***funcionario***
    aplicacao.patch('/cadastroUpdade', (request, response, next)=>{
        let updateCadastro = request.body;
        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.funcionarioModel;

        return cadastro.updateFuncionario(updateCadastro, conexao).then(success => {
            if(success.affectedRows === 0){
                return response.send({message:'Cadastro inexistente!'});
            }
            return response.send({funcionario : success});
        }).catch( error => {
            next({erro: error.sqlMessage});
        });
    })
    //***empresa***
    aplicacao.patch('/empresaUpdate', (request, response, next)=>{  
        let updateEmpresa = request.body;
        let conexao = aplicacao.config.dbConexao();
        let empresa = aplicacao.app.modelos.empresaModel;

        return empresa.updateEmpresa(updateEmpresa, conexao).then(success => {
            if(success.affectedRows === 0){
                return response.send({message:'Empresa inexistente!'});
            }
            return response.send({mensagem: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
    //***ponto***
    aplicacao.patch('/pontoUpdate', (request, response, next)=>{  
        let updatePonto = request.body;
        let conexao = aplicacao.config.dbConexao();
        let ponto = aplicacao.app.modelos.pontoModel;

        return ponto.updatePonto(updatePonto, conexao).then(success => {
            if(success.affectedRows === 0){
                return response.send({message:'Ponto inexistente!'});
            }
            return response.send({mensagem: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
    aplicacao.patch('/ajusteUpdate', (request, response, next)=>{
        let updateAjuste = request.body;
        let conexao = aplicacao.config.dbConexao();
        let ajuste= aplicacao.app.modelos.ajusteModel;

        return ajuste.updateAjuste(updateAjuste, conexao).then(success => {
            return response.send({ajuste: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
}