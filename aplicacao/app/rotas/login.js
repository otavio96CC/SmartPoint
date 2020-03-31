module.exports = function(aplicacao){
    let login = aplicacao.app.controllers.loginController;
    aplicacao.post('/login', login.login);
}