/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ajustes', {
		id_ajuste: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		justificativa_ajuste: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		hora_ajuste: {
			type: DataTypes.DATE,
			allowNull: false
		},
		funcionario_id_funcionario: {
			type: DataTypes.STRING(36),
			allowNull: false,
			references: {
				model: 'funcionarios',
				key: 'id_funcionario'
			}
		},
		pontos_id_ponto: {
			type: DataTypes.STRING(36),
			allowNull: false,
			references: {
				model: 'pontos',
				key: 'id_ponto'
			}
		},
		status_ajuste: {
			type: DataTypes.ENUM('Negado','Aprovado','Pendente'),
			allowNull: false,
			defaultValue: 'Pendente'
		},
		empresas_id_empresa: {
			type: DataTypes.STRING(36),
			allowNull: false,
			references: {
				model: 'empresas',
				key: 'id_empresa'
			}
		},
		status: {
			type: DataTypes.ENUM('Ativo','Inativo'),
			allowNull: false
		}
	}, {
		tableName: 'ajustes'
	});
};
