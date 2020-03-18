module.exports = function(){
	this.setEndereco = function(endereco, conexao, callback){
		conexao.query('insert into enderecos set ?', endereco, callback);
	}
	this.updateEndereco = function(endereco, conexao, callback){
		let {id_endereco} = endereco;
		conexao.query(`update enderecos set ? where id_endereco = '${id_endereco}'`, endereco, callback);
	}
	this.deleteEndereco = function(endereco, conexao, callback){
		endereco.status = 'Inativo';
		let {id_endereco} = endereco;
		conexao.query(`update enderecos set ? where id_endereco = '${id_endereco}'`, endereco,  callback);
	}
	this.getEndereco = function(conexao, callback){
		conexao.query('select * from enderecos', callback);
	}
	return this;
}