var uuid = require('uuid');

module.exports = function(){
    this.setPonto = function(ponto, conexao){
        let pontoNow ={
            id_ponto: uuid.v4(),
            hora_ponto: new Date(),
            funcionarios_id_funcionario: ponto.funcionario
        };
        return new Promise((resolve, reject)=>{
            conexao.query('INSERT INTO pontos SET ?', pontoNow, (error,result)=> {
				if(error){
					return reject(error);
				}
				return resolve(result);
			});
        });
    }
    this.getPonto = function(conexao){
        return new Promise((resolve, reject)=>{
            conexao.query('SELECT * FROM pontos', (error,result)=> {
				if(error){
					return reject(error);
				}
				return resolve(result);
			});
        });
    }
    this.updatePonto = function(ponto, conexao){
        let {id_funcionario} = ponto;
        delete ponto.id_funcionario;
        ponto.status_ponto = 'Modificado';
        
        return new Promise((resolve, reject)=>{
            conexao.query(`UPDATE pontos SET ? WHERE  funcionarios_id_funcionario = '${id_funcionario}'`, ponto,(error, result)=>{
                if(error){
					return reject(error);
				}
				return resolve(result);
            });
        });
    }
    this.deletePonto = function(ponto, conexao){
        ponto.status = 'Inativo';
        let {id_ponto} = ponto ;
        return new Promise((resolve, reject)=>{
            conexao.query(`UPDATE pontos SET ? WHERE  id_ponto = '${id_ponto}'`, ponto,(error, result)=>{
                if(error){
					return reject(error);
				}
				return resolve(result);
            });
        });
    }
    return this;
}