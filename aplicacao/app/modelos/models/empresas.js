/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('empresas', {
		id_empresa: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		nome_empresa: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		cnpj_empresa: {
			type: DataTypes.STRING(18),
			allowNull: false,
			unique: true
		},
		telefone_empresa: {
			type: DataTypes.STRING(12),
			allowNull: false
		},
		email_empresa: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		hora_empresa: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '8'
		},
		status: {
			type: DataTypes.ENUM('Ativo','Inativo'),
			allowNull: false,
			defaultValue: 'Ativo'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'empresas'
	});
};
