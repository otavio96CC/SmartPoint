/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('funcionarios', {
		id_funcionario: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		nome_funcionario: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		matricula_funcionario: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true
		},
		cpf_funcionario: {
			type: DataTypes.STRING(14),
			allowNull: false,
			unique: true
		},
		telefone_funcionario: {
			type: DataTypes.STRING(12),
			allowNull: true
		},
		senha_funcionario: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		permissao_funcionario: {
			type: DataTypes.ENUM('Usuario','Administrador'),
			allowNull: false,
			defaultValue: 'Usuario'
		},
		status: {
			type: DataTypes.ENUM('Ativo','Inativo'),
			allowNull: false,
			defaultValue: 'Ativo'
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
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'funcionarios'
	});
};
