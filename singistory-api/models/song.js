module.exports = (sequelize, DataTypes) => {
    const Song = sequelize.define(
        'Song',
        {
            songName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            youtube: DataTypes.STRING,
            spotify: DataTypes.STRING

        }, {
        underscored: true
    }
    );

    Song.associate = models => {
        Song.belongsTo(models.Singer, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

        Song.belongsTo(models.Album, {
            foreignKey: {
                name: 'albumId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

        Song.hasMany(models.Genre, {
            foreignKey: {
                name: 'songId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

    }

    return Song;

};