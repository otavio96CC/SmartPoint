module.exports = function(aplicacao){
    this.setPonto = (request, response, next)=>{
        let ponto = request.body;

        let conexao = aplicacao.config.dbConexao();
        let cadastrarPonto = aplicacao.app.modelos.pontoModel;

        return cadastrarPonto.setPonto(ponto, conexao).then(success => {
            return response.send({ponto: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    }
    this.getPonto = (request, response, next)=>{

        let conexao = aplicacao.config.dbConexao;
        let ponto = aplicacao.app.modelos.pontoModel;

        return ponto.getPonto(conexao).then(success => {
            return response.send({pontos: success});
        }).catch(error => {
            next({erro: error.sqlMessage});
        });
    }
    this.deletePonto = (request, response, next)=>{
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
    }
    this.updatePonto = (request, response, next)=>{  
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
    }

    return this;
}