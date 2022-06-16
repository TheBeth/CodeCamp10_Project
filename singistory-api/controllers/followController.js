const { Follow, Singer } = require('../models');

exports.getFollowBySingerId = async (req, res, next) => {
    try{
        const {id} = req.params;
        const follow = await Follow.findOne({where:{singerId:id, userId:req.user.id}})
        if(!follow){
            return res.status(400).json({message:'follow not found'})
        }

        
        res.status(200).json(follow)
    }catch(err){
        next(err)
    }
}

exports.createLike = async (req, res, next) => {
    try {
        const { singerId } = req.body;

        const singer = await Singer.findOne({ where: { id: singerId } });
        if (!singer) {
            return res.status(400).json({ message: 'Singer not found' });
        }

        const follow = await Follow.findOne({ where: { singerId, userId: req.user.id } })
        if (follow) {
            return res.status(400).json({ message: 'This singer been follow before' })
        }

        await Follow.create({
            singerId,
            userId: req.user.id
        })

        res.status(201).json({ message: 'Followed' })

    } catch (err) {
        next(err)
    }
}

exports.deleteFollow = async (req, res, next) => {
    try {
        const { id } = req.params;
        const follow = await Follow.findOne({ where: { id } })
        if (!follow) {
            return res.status(400).json({ message: 'Follow not found' })
        }

        if (req.user.id !== follow.userId) {
            return res.status(403).json({ message: 'cannot dalete follow' })
        }

        await follow.destroy()

        res.status(204).json()


    } catch (err) {
        next(err)
    }
}