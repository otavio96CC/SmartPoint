module.exports = function(aplicacao){
    aplicacao.delete('/enderecoDelete', (request, response)=>{
        let deleteEndereco = request.body
        let conexao = aplicacao.config.dbConexao()
        let cadastro = aplicacao.app.modelos.enderecoModel

        cadastro.deleteEndereco(deleteEndereco, conexao, (error, result)=>{
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