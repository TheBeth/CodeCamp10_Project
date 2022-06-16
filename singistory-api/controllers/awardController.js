const {Award, Singer} = require('../models');

exports.createAward = async (req, res, next) => {
    try{
        const { title, year, role, stage, singerId} = req.body;
        if(req.user.firstName !== 'Admin'){
            return res.status(400).json({message: 'Only Admin can create'});
        }
        
        if(!title){
            return res.status(400).json({message:'require title'})
        }
        if(!year){
            return res.status(400).json({message:'require year'})
        }
        if(!role){
            return res.status(400).json({message:'require role'})
        }
        if(!stage){
            return res.status(400).json({message:'require stage'})
        }

        const singer = await Singer.findOne({where : {id: singerId}})
        if(!singer){
            return res.status(400).json({message: 'singer not found'})
        }


        const award = await Award.create({
            title,
            year,
            role,
            stage,
            singerId
        })

        res.status(201).json({award})

    }catch(err){
        next(err);
    }
}

exports.deleteAward = async(req, res, next) => {
    try{
        const {id} = req.params;
        const award = await Award.findOne({where :{id}})
        if(!award){
            return res.status(400).json({message: "Award not found"})
        }

        if(req.user.firstName !== "Admin"){
            return res.status(403).json({message : "Only Admin can delete"})
        }

        await award.destroy()

        res.status(204).json()

    }catch(err){
        next(err)
    }
}