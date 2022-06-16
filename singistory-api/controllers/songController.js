const { Song, Album, Singer, sequelize, Genre } = require('../models');
const { Op } = require('sequelize')

exports.createSong = async (req, res, next) => {
    try {
        const { songName, youtube, spotify, singerId, albumId } = req.body;
        const singer = await Singer.findOne({ where: { id: singerId } })
        if (!singer) {
            return res.status(400).json({ message: 'Singer not found' })
        }
        const album = await Album.findOne({ where: { id: albumId } })
        if (!album) {
            return res.status(400).json({ message: 'Album not found' })
        }

        if(!songName){
            return res.status(400).json({message:'Song Name require'})
        }

        if (req.user.firstName !== 'Admin') {
            return res.status(400).json({ message: 'Only admin can create song' })
        }

        await Song.create({
            songName,
            youtube,
            spotify,
            singerId,
            albumId
        })

        res.status(200).json({ message: 'song created' })

    } catch (err) {
        next(err)
    }
}

exports.deleteSong = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const song = await Song.findOne({ where: { id } })
        if (!song) {
            return res.status(400).json({ message: 'Song not found' })
        }

        if (req.user.firstName !== 'Admin') {
            return res.status(400).json({ message: 'Only Admin can delete song' })
        }

        await Genre.destroy({ where: { songId: id } }, { transaction });
        await Song.destroy({ where: { id } }, { transaction });
        await transaction.commit();
        res.status(200).json();

    } catch (err) {
        await transaction.rollback();
        next(err);
    }
}

exports.searchSong = async (req, res, next) => {
    try {
        const { searchSong } = req.query;

        const song = await Song.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            songName: {
                                [Op.substring]: searchSong
                            }
                        }
                    ]
                }
            }
        )

        res.status(200).json({ song })
    } catch (err) {
        next(err);
    }
}