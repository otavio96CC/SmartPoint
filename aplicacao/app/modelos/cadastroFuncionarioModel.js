var uuid = require('uuid');

module.exports = function(){
	this.setCadastro = function(cadastro, conexao){
		
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

        let funcionario = {
            id_funcionario: uuid.v4(),
            nome_funcionario: cadastro.nome,
            matricula_funcionario: cadastro.matricula,
            cpf_funcionario: cadastro.cpf,
            telefone_funcionario: cadastro.telefone,
            senha_funcionario: cadastro.senha,
            empresas_id_empresa: cadastro.empresa,
            enderecos_id_endereco: endereco.id_endereco
        }

		return new Promise((resolve, reject)=>{
			conexao.beginTransaction(function(err) {
				if (err) { 
					return reject(err);
				}
				conexao.query('insert into enderecos set ?', endereco, function(err, result) {
					if (err) { 
						conexao.rollback(function() {
							conexao.end();
							console.log('primeiro rollback');
							return reject(err);
						});
						return reject(err);
					}
			
					conexao.query('insert into funcionarios set ?', funcionario, function(err, result) {
						if (err) { 
							conexao.rollback(function() {
								conexao.end();
								console.log('segundo rollback');
								return reject(err);
							});
							return reject(err);
						}  
						conexao.commit(function(err) {
						if (err) { 
							conexao.rollback(function() {
								conexao.end();
								console.log('terceiro rollback');
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
	}
	this.updateEndereco = function(funcionario, conexao){
		let {id_funcionario} = funcionario;
		let endereco = {};
		let contemEndereco = Object.keys(funcionario);
		let testeEndereco = ['rua', 'quadraLote', 'numero', 'bairro', 'logradouro', 'cep', 'cidade'];
		let keyEndereco = ['rua_endereco', 'quadra_lote_endereco', 'numero_endereco', 'bairro_endereco', 'logradouro_endereco', 'cep_endereco', 'cidade _endereco'];
		for(let i = 0; i<contemEndereco.length; i++){
			for(let k=0; k<testeEndereco.length; k++){
				if(contemEndereco[i] == testeEndereco[k]){
					endereco[keyEndereco[k]] = funcionario[testeEndereco[k]];
					delete funcionario[testeEndereco[k]];
				}
			}
		}
		return new Promise((resolve, reject)=>{
			if(Object.getOwnPropertyNames(endereco).length === 0){
				conexao.query(`UPDATE funcionarios SET ? WHERE id_funcionario = '${id_funcionario}'`, funcionario, (err, result)=>{
					if (err) { 
						//conexao.end();	
						return reject(err);
					}
				console.log('Transacao completa.');
				return resolve(result);
				}); 
			}
			else if(Object.getOwnPropertyNames(funcionario).length === 1){
				conexao.beginTransaction(function(err) {
					if (err) { 
						return reject(err);
					}
					conexao.query(`SELECT * FROM funcionarios WHERE id_funcionario = '${id_funcionario}'`, (err, result)=>{
						if (err) { 
							conexao.rollback(function() {
								conexao.end();
								console.log('primeiro rollback');
								return reject(err);
							});
							return reject(err);
						}
						
						let enderecos_id_endereco = result[0].enderecos_id_endereco;
						
						conexao.query(`UPDATE enderecos SET ? WHERE id_endereco = '${enderecos_id_endereco}'`, endereco, (err, result)=>{
							if (err) { 
								conexao.rollback(function() {
									//conexao.end();
									console.log('segundo rollback');
									return reject(err);
								});
								return reject(err);
							}
							conexao.commit(function(err) {
								if (err) { 
									conexao.rollback(function() {
										//conexao.end();
										console.log('terceiro rollback');
										return reject(err);
									});
									return reject(err);
								}
							console.log('Transacao completa.');
							//conexao.end();
							return resolve(result);
							});
						});
							
					});
				});
			}else{
				conexao.beginTransaction(function(err) {
					if (err) { 
						return reject(err);
					}
					conexao.query(`SELECT * FROM funcionarios WHERE id_funcionario = '${id_funcionario}'`, (err, result)=>{
						if (err) { 
							conexao.rollback(function() {
								conexao.end();
								console.log('primeiro rollback');
								return reject(err);
							});
							return reject(err);
						}
						
						let enderecos_id_endereco = result[0].enderecos_id_endereco;

						conexao.query(`UPDATE enderecos SET ? WHERE id_endereco = '${enderecos_id_endereco}'`, endereco, (err, result)=>{
							if (err) { 
								conexao.rollback(function() {
									conexao.end();
									console.log('segundo rollback');
									return reject(err);
								});
								return reject(err);
							}
							conexao.query(`UPDATE funcionarios SET ? WHERE id_funcionario = '${id_funcionario}'`, funcionario, (err, result)=>{
								if (err) { 
									conexao.rollback(function() {
										//conexao.end();
										console.log('terceiro rollback');
										return reject(err);
									});
									return reject(err);
								}
								conexao.commit(function(err) {
									if (err) { 
										conexao.rollback(function() {
											//conexao.end();
											console.log('quarto rollback');
											return reject(err);
										});
										return reject(err);
									}
								console.log('Transacao completa.');
								//conexao.end();
								return resolve(result);
								});
							});
						});
					});
				});
			}
		});
	}
	this.deleteFuncionario = function(funcionario, conexao){
		funcionario.status = 'Inativo';
		let {id_funcionario} = funcionario;
		return new Promise((resolve, reject)=>{
			conexao.beginTransaction(function(err) {
				if (err) { 
					return reject(err);
				}
				conexao.query(`SELECT * FROM funcionarios WHERE id_funcionario = '${id_funcionario}'`, function(err, result) {
					if (err) { 
						conexao.rollback(function() {
							conexao.end();
							console.log('primeiro rollback');
							return reject(err);
						});
						return reject(err);
					}
					//console.log(result[0].enderecos_id_endereco);
					let enderecos_id_endereco = result[0].enderecos_id_endereco;
					//console.log(enderecos_id_endereco);
					let state = {status: 'Inativo'};
					//console.log(funcionario);

					conexao.query(`update enderecos set ? where id_endereco = '${enderecos_id_endereco}'`, state, function(err, result) {
						if (err) { 
							conexao.rollback(function() {
								conexao.end();
								console.log('segundo rollback');
								return reject(err);
							});
							return reject(err);
						} 
						conexao.query(`update funcionarios set ? where id_funcionario = '${id_funcionario}'`, funcionario, function(err, result) {
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
	this.getCadastro = function(conexao){
		return new Promise((resolve, reject)=>{
			conexao.query('SELECT * FROM funcionarios AS f JOIN enderecos AS e ON enderecos_id_endereco = id_endereco ', (error,result)=> {
				if(error){
					return reject(error);
				}
				return resolve(result);
			});
		});
	}
	return this;
}