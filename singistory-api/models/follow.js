module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define(
        'Follow',
        {},
        {
            underscored: true
        }
    );

    Follow.associate = models => {
        Follow.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });

        Follow.belongsTo(models.Singer, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

    }

    return Follow;

};