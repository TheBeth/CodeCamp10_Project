const { User, Post, Comment } = require('../models');

exports.createComment = async (req, res, next) => {
    try {
        const { title, postId } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Require Title' })
        }


        const post = await Post.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(400).json({ message: 'Post not found' })
        }

        const newComment = await Comment.create({
            title,
            postId,
            userId: req.user.id
        })

        const comment = await Comment.findOne({
            where: {
                id: newComment.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'profileImg']
                }
            ]
        })

        res.status(201).json({ comment })

    } catch (err) {
        next(err)
    }
}


exports.deleteComment = async (req, res, next) => {
    try{
        const { id } = req.params;
        const comment = await Comment.findOne({where : {id}});
        if(!comment){
            return res.status(400).json({message:'Comment not found'})
        }

        if(req.user.id !== comment.userId && req.user.firstName !== 'Admin'){
            return res.status(403).json({message:'Cannot delete Comment'})
        }

        await comment.destroy()

        res.status(204).json()

    }catch(err){
        next(err)
    }
}