/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pontos', {
		id_ponto: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		hora_ponto: {
			type: DataTypes.DATE,
			allowNull: false
		},
		status_ponto: {
			type: DataTypes.ENUM('Negado','Aprovado','Modificado'),
			allowNull: false,
			defaultValue: 'Aprovado'
		},
		funcionarios_id_funcionario: {
			type: DataTypes.STRING(36),
			allowNull: false,
			references: {
				model: 'funcionarios',
				key: 'id_funcionario'
			}
		},
		status: {
			type: DataTypes.ENUM('Ativo','Inativo'),
			allowNull: false
		}
	}, {
		tableName: 'pontos'
	});
};
