module.exports = (sequelize, DataTypes) => {
    const Award = sequelize.define(
        'Award',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            year: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            stage: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }

        }, {
        underscored: true
    }
    );

    Award.associate = models => {
        Award.belongsTo(models.Singer, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

    }

    return Award;

};