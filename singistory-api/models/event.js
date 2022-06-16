module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        'Event',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            date: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            location: {
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
            },
            link: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            ticketSale: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            posterImg: DataTypes.STRING

        }, {
        underscored: true
    }
    );

    Event.associate = models => {
        Event.belongsTo(models.Singer, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

        Event.hasMany(models.Interest, {
            foreignKey: {
                name: 'eventId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

    }

    return Event;

};