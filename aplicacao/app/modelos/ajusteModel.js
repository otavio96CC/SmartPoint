var uuid = require('uuid');

module.exports = function(){
    this.setAjuste = function(ajuste, conexao){
        let ajusteNow = {
            id_ajuste: uuid.v4(),
            justificativa_ajuste: ajuste.justificativa,
            hora_ajuste: new Date(ano, mes, dia, hora, minuto),
            funcionario_id_funcionario: ajuste.id_funcionario,
            pontos_id_ponto: ajuste.id_ponto,
            empresas_id_empresa: ajuste.id_empresa
        };
        return new Promise((resolve, reject)=>{
            conexao.query('INSERT INTO ajustes SET ?', ajusteNow, (error,result)=> {
				if(error){
					return reject(error);
				}
				return resolve(result);
			});
        });
    }
    this.getAjustes = function(conexao){
        return new Promise((resolve, reject)=>{
            conexao.query('SELECT * FROM ajustes', (error,result)=> {
				if(error){
					return reject(error);
				}
				return resolve(result);
			});
        });
    }
    this.updateAjuste = function(ajuste, conexao){
        let {id_ponto} = ajuste;
        //delete ponto.id_funcionario;
        //ponto.status_ponto = 'Modificado';
        
        return new Promise((resolve, reject)=>{
            conexao.query(`UPDATE ajustes SET ? WHERE pontos_id_ponto = '${id_ponto}'`, ajuste,(error, result)=>{
                if(error){
					return reject(error);
				}
				return resolve(result);
            });
        });
    }
    this.deletePonto = function(ajuste, conexao){
        ajuste.status = 'Inativo';
        let {id_ponto} = ajuste;
        return new Promise((resolve, reject)=>{
            conexao.query(`UPDATE ajustes SET ? WHERE  pontos_id_ponto = '${id_ponto}'`, ajuste,(error, result)=>{
                if(error){
					return reject(error);
				}
				return resolve(result);
            });
        });
    }
    return this;
}