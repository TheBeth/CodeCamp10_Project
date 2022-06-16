const util = require('util');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { User, Singer, Post, Comment, sequelize } = require('../models');

const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.getPost = async (req, res, next) => {
    try {
        const { singerId } = req.params

        const singer = await Singer.findOne({ where: { id: singerId } })
        if (!singer) {
            return res.status(400).json({ message: 'Singer not found' })
        }
        const posts = await Post.findAll({
            where: { singerId: singerId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'profileImg']
                },
                {
                    model: Comment,
                    attributes: ['title', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: User,
                            attributes: ['firstName', 'lastName', 'profileImg']
                        }
                    ]
                },
                {
                    model: Singer,
                    attributes: ['firstName', 'lastName']
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json(posts)

    } catch (err) {
        next(err)
    }
}

exports.getAllPost = async (req, res, next) => {
    try {
        const allSinger = await Singer.findAll({
            include: [
                {
                    model: Post
                }
            ]
        })
        res.status(200).json(allSinger)
    } catch (err) {
        next(err);
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ where: { id } })
        if (!post) {
            return res.status(400).json({ message: 'Post not found' })
        }

        const onePost = await Post.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName', 'profileImg']
                },
                {
                    model: Comment,
                    attributes: ['title', 'createdAt', 'id'],
                    include: {
                        model: User,
                        attributes: ['firstName', 'lastName', 'profileImg']
                    }
                }
            ]
        })

        res.status(200).json(onePost)

    } catch (err) {
        next(err);
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { header, title, singerId } = req.body;
        if (!header) {
            return res.status(400).json({ message: 'require header' })
        }

        const singer = await Singer.findOne({ where: { id: singerId } })
        if (!singer) {
            return res.status(400).json({ message: 'Singer not found' })
        }

        let result = {};
        if (req.file) {
            result = await uploadPromise(req.file.path)
            fs.unlinkSync(req.file.path)
        }

        const post = await Post.create({
            header,
            title,
            img: result.secure_url,
            singerId,
            userId: req.user.id
        })

        res.status(201).json({ post })
    } catch (err) {
        next(err)
    }
}

exports.deletePost = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {

        const { id } = req.params;
        const post = await Post.findOne({ where: { id } })
        if (!post) {
            return res.status(400).json({ message: "Post not found" })
        }

        if (req.user.id !== post.userId && req.user.firstName !== 'Admin') {
            return res.status(403).json({ message: 'Cannot delete Post' })
        }

        await Comment.destroy({ where: { postId: id } }, { transaction });
        await Post.destroy({ where: { id } }, { transaction });
        await transaction.commit();
        res.status(200).json()

    } catch (err) {
        await transaction.rollback();
        next(err);
    }
}