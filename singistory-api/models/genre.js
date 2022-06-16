module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define(
        'Genre',
        {
            genreType: {
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

    Genre.associate = models => {
        Genre.belongsTo(models.Song, {
            foreignKey: {
                name: 'songId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        });

    }

    return Genre;

};