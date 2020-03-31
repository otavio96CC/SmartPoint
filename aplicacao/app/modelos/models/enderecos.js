/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('enderecos', {
		id_endereco: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		rua_endereco: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		quadra_lote_endereco: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		numero_endereco: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		bairro_endereco: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		logradouro_endereco: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		cep_endereco: {
			type: DataTypes.STRING(9),
			allowNull: false
		},
		cidade_endereco: {
			type: DataTypes.STRING(45),
			allowNull: false
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
		tableName: 'enderecos'
	});
};
