const { Event, Interest } = require('../models')

exports.getInterestByEventId = async (req, res, next) => {
    try{
        const {id} = req.params;
        const interest = await Interest.findOne({where:{eventId:id, userId:req.user.id}})
        if(!interest){
            return res.status(400).json({message:'Event not found'})
        }

        res.status(200).json(interest);

    }catch(err){
        next(err)
    }
}

exports.createInterest = async (req, res, next) => {
    try {
        const { eventId } =req.body;

        const event = await Event.findOne({where:{id:eventId}})
        if(!event){
            return res.status(400).json({message:'Event not found'})
        }

        const interest = await Interest.findOne({where:{eventId, userId:req.user.id }})
        if(interest){
            return res.status(400).json({message:'You have been interest this event before'})
        }

        await Interest.create({
            eventId,
            userId:req.user.id
        })
        
        res.status(201).json({message:"Interested"})
    } catch (err) {
        next(err);
    }
}

exports.deleteInterest = async (req, res, next) => {
    try{
        const {id} = req.params;
        const interest = await Interest.findOne({where:{id}})
        if(!interest){
            return res.status(400).json({message:'Interest not found'})
        }

        if(req.user.id !== interest.userId){
            return res.status(403).json({message:'Cannot delete interest'})
        }

        await interest.destroy();

        res.status(204).json();
    }catch(err){
        next(err);
    }
}