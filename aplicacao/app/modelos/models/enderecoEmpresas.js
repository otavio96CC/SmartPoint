/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('endereco_empresas', {
		id_endereco_empresas: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		empresas_id_empresa: {
			type: DataTypes.STRING(36),
			allowNull: false,
			references: {
				model: 'empresas',
				key: 'id_empresa'
			}
		},
		enderecos_id_endereco: {
			type: DataTypes.STRING(36),
			allowNull: false,
			references: {
				model: 'enderecos',
				key: 'id_endereco'
			}
		},
		status: {
			type: DataTypes.ENUM('Ativo','Inativo'),
			allowNull: false
		}
	}, {
		tableName: 'endereco_empresas'
	});
};
