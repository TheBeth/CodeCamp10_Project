const util = require('util');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { Singer, Album, Song, Genre, sequelize } = require('../models');

const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.getAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        const album = await Album.findOne({ where: { id } })
        if (!album) {
            return res.status(400).json({ message: 'Album not found' })
        }

        const albumDetail = await Album.findOne({
            where: { id },
            include: [
                {
                    model: Singer,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: Song,
                    attributes: ['songName', 'youtube', 'spotify', 'id'],
                    include:[
                        {
                            model:Singer,
                            attributes:['firstName', 'lastName']
                        },
                        {
                            model:Genre,
                            attributes:['genreType']
                        }
                    ]
                }
            ]
        })

        res.status(200).json( albumDetail )

    } catch (err) {
        next(err);
    }
}

exports.createAlbum = async (req, res, next) => {
    try {
        const { albumName, year, track, singerId } = req.body;
        const newAlbum = await Album.findOne({ where: { albumName: albumName } })
        if (newAlbum) {
            return res.status(400).json({ message: 'Album name already in use' })
        }

        if (!albumName) {
            return res.status(400).json({ message: 'Album name require' });
        }
        if (!year) {
            return res.status(400).json({ message: 'Year require' });
        }
        if (!track) {
            return res.status(400).json({ message: 'Track require' });
        }

        const singer = await Singer.findOne({ where: { id: singerId } })
        if (!singer) {
            return res.status(400).json({ message: 'Singer not found' })
        }

        if (req.user.firstName !== 'Admin') {
            return res.status(400).json({ message: 'Only admin can create album' })
        }

        let result = {};
        if (req.file) {
            result = await uploadPromise(req.file.path)
            fs.unlinkSync(req.file.path)
        }

        const album = await Album.create({
            albumName,
            year,
            track,
            coverImg: result.secure_url,
            singerId
        })

        res.status(200).json({ album })

    } catch (err) {
        next(err)
    }
}

exports.deleteAlbum = async (req, res, next) => {
    // const transaction = await sequelize.transaction()
    try {
        const { id } = req.params;
        const album = await Album.findOne({ where: { id } })
        if (!album) {
            return res.status(400).json({ message: 'Album not found' })
        }

        if (req.user.firstName !== 'Admin') {
            return res.status(400).json({ message: 'Only Admin can delete Album' })
        }

        // const songs = await Song.findAll({ where: { albumId: id } })

        // const songIds = songs.reduce(
        //     (acc, item) => {
        //         if (id === item.albumId) {
        //             acc.push(item.albumId);
        //         }ß
        //         return acc;
        //     },
        //     []
        // );

        // await Song.destroy({ where: { albumId: id } }, { transaction })
        // await Album.destroy({ where: { id } }, { transaction })
        // transaction.commit();
        await album.destroy()
        res.status(200).json()

    } catch (err) {
        // await transaction.rollback();
        next(err);
    }
}


exports.editAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { albumName, year, track, singerId } = req.body;
        const album = await Album.findOne({ where: { id } })
        if (!album) {
            return res.status(400).json({ message: 'Album not found' })
        }

        if (req.user.firstName !== 'Admin') {
            return res.status(400).json({ message: 'Only admin can create album' })
        }

        let result = {};
        if (req.file) {
            result = await uploadPromise(req.file.path)
            fs.unlinkSync(req.file.path)
        }

        const newAlbum = await Album.update(
            {
                albumName,
                year,
                track,
                coverImg: result.secure_url,
                singerId
            },
            {
                where: { id }
            },
        )

        res.json({ newAlbum });

    } catch (err) {
        next(err)
    }
}