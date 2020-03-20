module.exports = function(aplicacao){
    aplicacao.patch('/enderecoUpdate', (request, response, next)=>{
        let updateEndereco = request.body
        let conexao = aplicacao.config.dbConexao()
        let cadastro = aplicacao.app.modelos.enderecoModel

        return cadastro.updateEndereco(updateEndereco, conexao).then(success => {
            if(success.affectedRows === 0){
                return response.send({message:'Cadastro inexistente!'});
            }
            return response.send({funcionario : success});
        }).catch( error => {
            next({erro: error.sqlMessage});
        })
    })
}