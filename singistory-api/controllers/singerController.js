const util = require('util');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { Singer, Album, Award } = require('../models');
const { Op } = require('sequelize');

const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.getAllSinger = async (req, res, next) => {
    try {
        const singer = await Singer.findAll()
        res.status(200).json(singer);
    } catch (err) {
        next(err);
    }
}

exports.getSingerDetail = async (req, res, next) => {
    try {
        const { id } = req.params
        const singer = await Singer.findOne({ where: { id } })
        if (!singer) {
            return res.status(400).json({ message: 'Singer not found' })
        }

        const singerDetail = await Singer.findOne(
            {
                where: { id },
                include: [
                    {
                        model: Album,
                        attributes: ['albumName', 'year', 'coverImg', 'id'],
                    },
                    {
                        model: Award,
                        attributes: ['title', 'year', 'role', 'stage']
                    }
                ],
                order: [[Album, 'year', 'DESC']]

            })

        res.status(200).json({ singerDetail })
    } catch (err) {
        next(err);
    }
}

exports.createSinger = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            birthDate,
            birthPlace,
            title,
            website,
            facebook,
            instragram,
            youtube
        } = req.body;

        const existSinger = await Singer.findOne({ where: { firstName: firstName, lastName: lastName } })
        if (existSinger) {
            return res.status(400).json({ message: 'This Name and Last Name already used' })
        }

        if(!birthDate){
            return res.status(400).json({message:'Birth Date Require'})
        }

        if(!birthPlace){
            return res.status(400).json({message:'Birth Place Require'})
        }

        let result = {};
        if (req.file) {
            result = await uploadPromise(req.file.path)
            fs.unlinkSync(req.file.path)
        }

        await Singer.create({
            firstName,
            lastName,
            birthDate,
            birthPlace,
            title,
            singerImg: result.secure_url,
            website,
            facebook,
            instragram,
            youtube
        });

        res.status(201).json({ message: 'Singer Created' })
    } catch (err) {
        next(err);
    }
};

exports.searchSinger = async (req, res, next) => {
    try {
        const { searchName } = req.query;

        const singer = await Singer.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            firstName: {
                                [Op.substring]: searchName
                            }
                        },
                        {

                            lastName: {
                                [Op.substring]: searchName
                            }
                        }
                    ]
                }
            }
        )

        if(!singer){
            return res.status(400).json({message:'Singer not match'})
        }

        res.status(200).json({ singer })
    } catch (err) {
        next(err)
    }
}

exports.deleteSinger = async (req, res, next) => {
    try {
        const { id } = req.params;
        const singer = await Singer.findOne({ where: { id } });
        if (!singer) {
            return res.status(400).json({ message: 'Singer not found' })
        }

        await singer.destroy()
        res.status(200).json();

    } catch (err) {
        next(err)
    }
}

exports.editSinger = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            birthDate,
            birthPlace,
            title,
            website,
            facebook,
            instragram,
            youtube
        } = req.body;

        const singer = await Singer.findOne({ where: { id } })
        if (!singer) {
            return res.status(400).json({ message: 'Singer not found' })
        }

        if(!firstName || !birthPlace || !birthDate || !title){
            return res.status(400).json({message:'First Name, Detail, Birth Date and Birth Place Require'})
        }

        if(title.length > 999){
            return res.status(400).json({message:'Title must have letter less than 1000'})
        }

        if (req.user.firstName !== 'Admin') {
            return res.status(400).json({ message: 'Only admin can create album' })
        }

        let result = {};
        if (req.file) {
            result = await uploadPromise(req.file.path)
            fs.unlinkSync(req.file.path)
        }

        const editSinger = await Singer.update(
            {
                firstName,
                lastName,
                birthDate,
                birthPlace,
                title,
                website,
                facebook,
                instragram,
                youtube,
                singerImg: result.secure_url
            },
            {
                where: { id }
            }
        )

        res.json({ editSinger })

    } catch (err) {
        next(err)
    }
}
