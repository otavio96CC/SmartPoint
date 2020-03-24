module.exports = function(aplicacao){
    aplicacao.delete('/cadastroDelete', (request, response, next)=>{
        let deleteEndereco = request.body;
        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.funcionarioModel;

        return cadastro.deleteFuncionario(deleteEndereco, conexao).then(success => {
            if(success.affectedRows === 0){
                return response.send({message:'Cadastro inexistente!'});
            }
            return response.send({funcionario : success});
        }).catch( error => {
            next({erro: error.sqlMessage});
        });
    });
    aplicacao.delete('/empresaDelete',(request, response, next)=>{
        let deleteEmpresa= request.body;
        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.empresaModel;

        return cadastro.deleteEmpresa(deleteEmpresa, conexao).then(success => {
            if(success.affectedRows === 0){
                return response.send({message:'Cadastro inexistente!'});
            }
            return response.send({empresa: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
    aplicacao.delete('/pontoDelete',(request, response, next)=>{
        let deletePonto = request.body;
        let conexao = aplicacao.config.dbConexao();
        let ponto = aplicacao.app.modelos.pontoModel;

        return ponto.deletePonto(deletePonto, conexao).then(success => {
            if(success.affectedRows === 0){
                return response.send({message:'Ponto inexistente!'});
            }
            return response.send({empresa: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
    aplicacao.delete('/ajusteDelete', (request, response, next)=>{
        let deleteAjuste = request.body;
        let conexao = aplicacao.config.dbConexao();
        let ajuste= aplicacao.app.modelos.ajusteModel;

        return ajuste.deleteAjuste(deleteAjuste, conexao).then(success => {
            return response.send({ajuste: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    });
}
