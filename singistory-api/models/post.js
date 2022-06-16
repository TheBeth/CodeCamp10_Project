module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post',
        {
            header: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            title: DataTypes.STRING,
            img: DataTypes.STRING

        }, {
        underscored: true
    }
    );

    Post.associate = models => {
        Post.belongsTo(models.Singer, {
            foreignKey: {
                name: 'singerId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Post.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Post.hasMany(models.Comment, {
            foreignKey: {
                name: 'postId',
                allowNull: false
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

    }

    return Post;

};