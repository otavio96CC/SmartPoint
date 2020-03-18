module.exports = function(aplicacao){
    aplicacao.patch('/enderecoUpdate', (request, response)=>{
        let updateEndereco = request.body
        let conexao = aplicacao.config.dbConexao()
        let cadastro = aplicacao.app.modelos.enderecoModel

        cadastro.updateEndereco(updateEndereco, conexao, (error, result)=>{
            console.log(error)
            if(result.affectedRows === 0 ){
                response.send({message:'Endereço não existe'})
            }
            else{
                response.send({enderecos : result})
            }
        })
    })
}