module.exports = function(aplicacao){
    let funcionarioController = aplicacao.app.controllers.funcionariosController;
    let empresaController = aplicacao.app.controllers.empresaController;
    let pontoController = aplicacao.app.controllers.pontoController;
    let ajusteController = aplicacao.app.controllers.ajusteController;

    aplicacao.get('/funcionarioRead', funcionarioController.getFuncionario);
    aplicacao.post('/funcionarioCreate', funcionarioController.setFuncionario);

    aplicacao.post('/empresaCreate',empresaController.setEmpresa);
    aplicacao.get('/empresaRead', empresaController.getEmpresa);

    aplicacao.post('/pontoCreate', pontoController.setPonto);
    aplicacao.get('/pontoRead', pontoController.getPonto);

    aplicacao.post('/ajusteCreate', ajusteController.setAjuste);
    aplicacao.get('/ajusteRead',ajusteController.getAjuste);

    aplicacao.get('/teste', funcionarioController.teste);
}