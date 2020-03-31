module.exports = function(aplicacao){
    this.setEmpresa = (request, response, next)=>{
        let cadastro = request.body;

        let conexao = aplicacao.config.dbConexao();
        let cadastrarEmpresa = aplicacao.app.modelos.empresaModel;

        return cadastrarEmpresa.setEmpresa(cadastro, conexao).then(success => {
            return response.send({empresa: success});
        }).catch(error => {
            next({erro : error.sqlMessage});
        });
    }
    this.getEmpresa = (request, response, next)=>{

        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.empresaModel;

        return cadastro.getEmpresa(conexao).then(success => {
            return response.send({funcionarios: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    }
    this.deleteEmpresa = (request, response, next)=>{
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
    }
    this.updateEmpresa = (request, response, next)=>{  
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
    }

    return this;
}