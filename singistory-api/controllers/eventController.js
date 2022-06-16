const util = require('util');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { Event, Singer, sequelize, Interest } = require('../models');

const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.getAllEvent = async (req, res, next) => {
    try {
        const allEvent = await Event.findAll({order: [['date', 'DESC']]})
        res.status(200).json(allEvent);
    } catch (err) {
        next(err);
    }
}

exports.getEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await Event.findOne({ where: { id } })
        if (!event) {
            return res.status(400).json({ message: 'Event not found' })
        }

        const eventDetail = await Event.findOne({
            where: { id },
            attributes:['stage', 'title', 'date', 'location', 'link', 'ticketSale', 'posterImg'],
            include: [
                {
                    model: Singer,
                    attributes: ['firstName', 'lastName']
                }
            ]
        })
         res.status(200).json(eventDetail);

    } catch (err) {
        next(err);
    }
}


exports.createEvent = async (req, res, next) => {
    try {
        const { title, date, location, stage, link, ticketSale, singerId } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'require title' })
        }
        if (!date) {
            return res.status(400).json({ message: 'require date' })
        }
        if (!location) {
            return res.status(400).json({ message: 'require location' })
        }
        if (!stage) {
            return res.status(400).json({ message: 'require stage' })
        }
        if (!link) {
            return res.status(400).json({ message: 'require link' })
        }
        if (!ticketSale) {
            return res.status(400).json({ message: 'require ticket sale' })
        }

        const singer = await Singer.findOne({ where: { id: singerId } })
        if (!singer) {
            return res.status(400).json({ message: 'Singer not found' })
        }

        if (req.user.firstName !== 'Admin') {
            return res.status(400).json({ message: 'Only Admin can create event' })
        }

        let result = {};
        if (req.file) {
            result = await uploadPromise(req.file.path)
            fs.unlinkSync(req.file.path)
        }

        const event = await Event.create({
            title,
            date,
            location,
            stage,
            link,
            ticketSale,
            posterImg: result.secure_url,
            singerId
        })

        res.status(201).json({ event })

    } catch (err) {
        next(err);
    }
}

exports.deleteEvent = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const event = await Event.findOne({ where: { id } })
        if (!event) {
            return res.status(400).status({ message: 'Event not found' })
        }

        if (req.user.firstName !== 'Admin') {
            return res.status(400).json({ message: 'Only Admin can delete event' })
        }

        await Interest.destroy({ where: { eventId: id } }, { transaction })
        await Event.destroy({ where: { id } }, { transaction });
        await transaction.commit();
        res.status(200).json();

    } catch (err) {
        await transaction.rollback();
        next(err);
    }
}
