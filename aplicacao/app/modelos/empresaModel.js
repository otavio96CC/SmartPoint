var uuid = require('uuid');
3
module.exports = function(){
    this.setEmpresa = function(cadastro, conexao){

		let endereco = {
            id_endereco: uuid.v4(),
            rua_endereco: cadastro.rua,
            quadra_lote_endereco: cadastro.quadraLote,
            numero_endereco: cadastro.numero,
            bairro_endereco: cadastro.bairro,
            logradouro_endereco: cadastro.logradouro,
            cep_endereco: cadastro.cep,
            cidade_endereco: cadastro.cidade
		}
		let empresa = {
			id_empresa: uuid.v4(),
			nome_empresa: cadastro.nome,
			cnpj_empresa: cadastro.cnpj,
			telefone_empresa: cadastro.telefone,
			email_empresa: cadastro.email
		}
		return new Promise((resolve, reject)=>{
			conexao.beginTransaction((err)=>{
				if (err) { 
					return reject(err);
				}
				conexao.query('INSERT INTO enderecos SET ?', endereco, (error, result)=>{
					if(error){
						conexao.rollback(function() {
							conexao.end();
							console.log('primeiro rollback');
							return reject(err);
						});
						return reject(error);
					}
					conexao.query('INSERT INTO empresas SET ?', empresa, (err, result)=>{
						if (err) { 
							conexao.rollback(function() {
								conexao.end();
								console.log('segundo rollback');
								return reject(err);
							});
							return reject(err);
						}
						let keyEstrageiras = {
							id_endereco_empresas: uuid.v4(),
							empresas_id_empresa: empresa.id_empresa,
							enderecos_id_endereco: endereco.id_endereco
						}
						conexao.query('INSERT INTO endereco_empresas SET ?', keyEstrageiras, (err, result)=>{
							if (err) { 
								conexao.rollback(function() {
									conexao.end();
									console.log('terceiro rollback');
									return reject(err);
								});
								return reject(err);
							}
							conexao.commit(function(err) {
								if (err) { 
									conexao.rollback(function() {
										conexao.end();
										console.log('quarto rollback');
										return reject(err);
									});
									return reject(err);
								}
							console.log('Transacao completa.');
							conexao.end();
							return resolve(result);
							});
						});
					});
				});
			});
		});
	}
	this.getEmpresa = function(conexao){
		return new Promise((resolve, reject)=>{
			conexao.query('SELECT * FROM empresas, endereco_empresas, enderecos WHERE id_empresa = empresas_id_empresa AND id_endereco = enderecos_id_endereco', (error,result)=> {
				if(error){
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			});
		});
	}
	this.deleteEmpresa = function(empresa, conexao){
		let state = {status: 'Inativo'};
		let {id_empresa} = empresa;
		return new Promise((resolve, reject)=>{
			conexao.beginTransaction((err)=>{
				if (err) { 
					return reject(err);
				}
				conexao.query(`SELECT * FROM endereco_empresas WHERE empresas_id_empresa = '${id_empresa}'`, (err, result)=>{
					if (err) { 
						conexao.rollback(function() {
							conexao.end();
							console.log('primeiro rollback');
							return reject(err);
						});
						return reject(err);
					}
					
					let enderecos_id_endereco = result[0].enderecos_id_endereco;
					let id_endereco_empresas = result[0].id_endereco_empresas;
					
					conexao.query(`UPDATE enderecos SET ? WHERE id_endereco = '${enderecos_id_endereco}'`, state, (err, result)=>{
						if (err) { 
							conexao.rollback(function() {
								conexao.end();
								console.log('segundo rollback');
								return reject(err);
							});
							return reject(err);
						}
						conexao.query(`UPDATE endereco_empresas SET ? WHERE id_endereco_empresas = '${id_endereco_empresas}'`, state, (err, result)=>{
							if (err) { 
								conexao.rollback(function() {
									conexao.end();
									console.log('terceiro rollback');
									return reject(err);
								});
								return reject(err);
							}
							conexao.query(`UPDATE empresas SET ? WHERE id_empresa = '${id_empresa}'`, state, (err, result)=>{
								if (err) { 
									conexao.rollback(function() {
										conexao.end();
										console.log('quarto rollback');
										return reject(err);
									});
									return reject(err);
								}
								conexao.commit(function(err) {
									if (err) { 
										conexao.rollback(function() {
											conexao.end();
											console.log('quinto rollback');
											return reject(err);
										});
										return reject(err);
									}
								console.log('Transacao completa.');
								conexao.end();
								return resolve(result);
								});
							});
						});
					});
				});
			});
		});
	}
    return this;
}