module.exports = function(aplicacao){
    let login = aplicacao.app.controllers.login;
    aplicacao.post('/login', login.login);
}