const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { User, Interest, Event, Follow, Singer, Post, sequelize, Comment } = require('../models');
const bcrypt = require('bcryptjs');

exports.updateProfileImg = (req, res, next) => {
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) { return next(err); }

        await User.update(
            { profileImg: result.secure_url },
            { where: { id: req.user.id } }
        );

        if (req.user.profileImg) {
            const splited = req.user.profileImg.split('/')
            cloudinary.uploader.destroy(splited[splited.length - 1].split('.')[0]);
        }

        fs.unlinkSync(req.file.path)

        res.json({ message: 'Profile Image Uploaded' })
    })
}

exports.getme = async (req, res, next) => {
    try{
        const { id,firstName, lastName, profileImg, phoneNumber, email} = req.user;
    
        res.status(200).json({user : {id, firstName, lastName, profileImg, phoneNumber, email}})

    }catch(err){
        next(err)
    }
}

exports.editProfile = async (req, res, next) => {
    try {
        const { firstName, lastName, phoneNumber } = req.body;


        if (req.user.firstName === 'Admin') {
            return res.status(400).json({ message: 'Admin cannot edit profile' })
        }

        if(phoneNumber === req.user.phoneNumber){
            return res.status(400).json({message:'require new phone number'})
        }

        await User.update(
            {
                firstName,
                lastName,
                phoneNumber
            },
            {
                where: { id: req.user.id }
            }
        )

        res.json({ message: 'User updated' })

    } catch (err) {
        next(err)
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;
        
        if (req.user.firstName === 'Admin') {
            return res.status(400).json({ message: 'Admin cannot edit profile' })
        }

        if(email !== req.user.email){
            return res.status(400).json({message:'Email not Match'})
        }    

        if (password !== confirmPassword) {
            return res.status(400).json({ mesage: 'Password not match confirm password' })
        }    

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.update({
            password: hashedPassword
        },
            {
                where: { id: req.user.id }
            }
        )

        res.json({ message: 'Password Changed' })

    } catch (err) {
        next(err)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Interest,
                    include: {
                        model: Event,
                        attributes: ['title', 'date', 'stage', 'location', 'posterImg','id']
                    }
                },
                {
                    model: Follow,
                    include: {
                        model: Singer,
                        attributes: ['firstName', 'lastName', 'id']
                    }
              ,
              order: [[Event, 'date', 'DESC']]  }
            ]
        })

        res.status(200).json({ user })
    } catch (err) {
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try{
        if(req.user.firstName == 'Admin'){
            return res.status(400).json({message:'Admin cannot delete own User'})
        }

        await Comment.destroy({where:{userId:req.user.id}},{transaction});
        await Post.destroy({where:{userId:req.user.id}}, {transaction});
        await Interest.destroy({where:{userId:req.user.id}},{transaction});
        await Follow.destroy({where:{userId:req.user.id}},{transaction});
        await User.destroy({where:{id:req.user.id}})

        res.status(200).json()

    }catch(err){
        await transaction.rollback();
        next(err);
    }
}