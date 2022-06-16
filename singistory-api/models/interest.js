module.exports = (sequelize, DataTypes) => {
    const Interest = sequelize.define(
        'Interest',
        {},
        {
            underscored: true
        }
    );

    Interest.associate = models => {
        Interest.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });
        
        Interest.belongsTo(models.Event, {
            foreignKey: {
                name: 'eventId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

    }

    return Interest;

};