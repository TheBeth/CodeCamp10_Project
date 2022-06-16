const { Song, Genre, Album, Singer } = require('../models');
const { Op } = require('sequelize');

exports.getGenre = async (req, res, next) => {
    try{
        const { genreType } = req.query;

        const genreList = await Genre.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            genreType: {
                                [Op.substring]: genreType
                            }
                        }
                    ]
                },
                include:[
                    {
                        model:Song,
                        attributes:['songName'],
                        include:[
                            {
                                model:Singer,
                                attributes:['firstName', 'lastName', 'id']
                            },
                            {
                                model:Album,
                                attributes:['albumName', 'id']
                            }
                        ]
                    }
                ]
            }
        )

        res.status(200).json({genreList})

    }catch(err){
        next(err);
    }
}

exports.createGenre = async (req, res, next) => {
    try{
        const { genreType, songId} = req.body;
        const song = await Song.findOne({where:{id : songId}});
        if(!song){
            return res.status(400).json({message:'Song not found'});
        }

        if(req.user.firstName !== 'Admin'){
            return res.status(400).json({message:'Only admin can create genre'})
        }

        if(!genreType){
            return res.status(400).json({message:'Genre Type require'})
        }

        const genre = await Genre.findOne({where:{genreType,songId}})
        if(genre){
            return res.status(400).json({message:'Already have genre'})
        }
        
        await Genre.create({
            genreType:genreType.toUpperCase(),
            songId
        })

        res.status(200).json({message:"Genre creted"})
    }catch(err){
        next(err)
    }
}

exports.deleteGenre = async (req, res, next) => {
    try{
        const {id} = req.params;
        const genre = await Genre.findOne({where:{id}})
        if(!genre){
            return res.status(400).json({message: 'Genre not found'})
        }

        if(req.user.firstName !== 'Admin'){
            return res.status(403).json({message:'Only admin can delete genre'})
        }

        await genre.destroy()

        res.status(204).json();

    }catch(err){
        next(err)
    }
}
