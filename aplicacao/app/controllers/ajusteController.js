module.exports = function(aplicacao){
    this.setAjuste = (request, response, next)=>{
        let ajuste = request.body;
        let conexao = aplicacao.config.dbConexao();
        let cadastrarAjuste= aplicacao.app.modelos.ajusteModel;

        return cadastrarAjuste.setAjuste(ajuste, conexao).then(success => {
            return response.send({ajuste: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    }
    this.getAjuste = (request, response, next)=>{
        let conexao = aplicacao.config.dbConexao();
        let cadastrarAjuste= aplicacao.app.modelos.ajusteModel;

        return cadastrarAjuste.getAjuste(conexao).then(success => {
            return response.send({ajuste: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    }
    this.deleteAjuste = (request, response, next)=>{
        let deleteAjuste = request.body;
        let conexao = aplicacao.config.dbConexao();
        let ajuste= aplicacao.app.modelos.ajusteModel;

        return ajuste.deleteAjuste(deleteAjuste, conexao).then(success => {
            return response.send({ajuste: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    }
    this.updateAjuste = (request, response, next)=>{
        let updateAjuste = request.body;
        let conexao = aplicacao.config.dbConexao();
        let ajuste= aplicacao.app.modelos.ajusteModel;

        return ajuste.updateAjuste(updateAjuste, conexao).then(success => {
            return response.send({ajuste: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    }

    return this;
}