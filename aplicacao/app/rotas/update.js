module.exports = function(aplicacao){
    let funcionarioController = aplicacao.app.controllers.funcionariosController;
    let empresaController = aplicacao.app.controllers.empresaController;
    let pontoController = aplicacao.app.controllers.pontoController;
    let ajusteController = aplicacao.app.controllers.ajusteController;
    //***funcionario***
    aplicacao.patch('/cadastroUpdade', funcionarioController.updateFuncionario);
    //***empresa***
    aplicacao.patch('/empresaUpdate', empresaController.updateEmpresa);
    //***ponto***
    aplicacao.patch('/pontoUpdate', pontoController.updatePonto);
    //***ajuste***
    aplicacao.patch('/ajusteUpdate', ajusteController.updateAjuste);
}