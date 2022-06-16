module.exports = (sequelize, DataTypes) => {
    const Singer = sequelize.define(
        'Singer',
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            lastName: {
                type: DataTypes.STRING,
            },
            birthDate: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            birthPlace: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            singerImg: DataTypes.STRING,
            website: DataTypes.STRING,
            facebook: DataTypes.STRING,
            instragram: DataTypes.STRING,
            youtube: DataTypes.STRING

        }, {
        underscored: true
    }
    );

    Singer.associate = models => {
        Singer.hasMany(models.Follow, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

        Singer.hasMany(models.Album, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

        Singer.hasMany(models.Song, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

        Singer.hasMany(models.Event, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

        Singer.hasMany(models.Award, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

        Singer.hasMany(models.Post, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

    }

    return Singer;

};