module.exports = function(aplicacao){
    let funcionarioController = aplicacao.app.controllers.funcionariosController;
    let empresaController = aplicacao.app.controllers.empresaController;
    let pontoController = aplicacao.app.controllers.pontoController;
    let ajusteController = aplicacao.app.controllers.ajusteController;

    aplicacao.delete('/cadastroDelete', funcionarioController.deleteFuncionario);

    aplicacao.delete('/empresaDelete', empresaController.deleteEmpresa);
    
    aplicacao.delete('/pontoDelete', pontoController.deletePonto);

    aplicacao.delete('/ajusteDelete', ajusteController.deleteAjuste);
}
