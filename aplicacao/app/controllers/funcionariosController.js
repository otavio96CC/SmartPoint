let crypto = require("crypto");

module.exports = function(aplicacao){
    this.getFuncionario = (request, response, next)=>{
        let conexao = aplicacao.config.dbConexao();
        let cadastro = aplicacao.app.modelos.funcionarioModel; 
    
        return cadastro.getCadastro(conexao).then(success => {
            return response.send({funcionarios: success});
        }).catch(error => {
            next({erro: error.sqlMessage})
        });
    }
    this.setFuncionario = (request, response, next)=>{
        let cadastro = request.body;

        let conexao = aplicacao.config.dbConexao();
        let cadastrarFuncionario = aplicacao.app.modelos.funcionarioModel;

        let hash = crypto.createHmac('sha256', 'otavio').update(login.senha).digest('base64');
        cadastro.senha = hash;

        return cadastrarFuncionario.setCadastro(cadastro, conexao).then(success => {
            return response.send({cadastros: success});
        }).catch(error => {
            next({erro : error.sqlMessage});
        });
    }
    this.deleteFuncionario = (request, response, next)=>{
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
    }
    this.updateFuncionario = (request, response, next)=>{
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
    }

    this.teste = (request, response, next)=>{
        let models = aplicacao.app.modelos.index;
        let db = models().db;
        console.log(db);
        db.funcionarios.findAll().then(success => {
            response.send({funcionarios: success});
        }).catch(error => {
            next(error);
        });
        
    }
    return this;
}
