module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define(
        'Album',
        {
            albumName: {
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
            track: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            coverImg: DataTypes.STRING,

        }, {
        underscored: true
    }
    );

    Album.associate = models => {
        Album.hasMany(models.Song, {
            foreignKey: {
                name: 'albumId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

        Album.belongsTo(models.Singer, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

    }

    return Album;

};