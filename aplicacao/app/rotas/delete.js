module.exports = function(aplicacao){
    aplicacao.delete('/enderecoDelete', (request, response, next)=>{
        let deleteEndereco = request.body;
        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.cadastroFuncionarioModel;

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
}
