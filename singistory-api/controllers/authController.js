const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { User } = require('../models');

exports.register = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            confirmPassword
        } = req.body;
        if (!firstName || !lastName || !phoneNumber) {
            return res.status(400).json({ message: 'First Name , Last Name and Phone Number require' })
        }
        if(!email){
            return res.status(400).json({message:'Email require'})
        }

        const havePhoneNumber = await User.findOne({ where: { phoneNumber } })
        if (havePhoneNumber) {
            return res.status(400).json({ message: 'Phone Number already in use' })
        }

        if (password != confirmPassword) {
            return res
                .status(400)
                .json({ message: 'password and confirm password did not match' })
        }

        const existUser = await User.findOne({ where: { email: email } })
        if (existUser) {
            return res.status(400).json({ message: 'This Email already used' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User Created' })


    } catch (err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid E-mail or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid E-mail or password' })
        }

        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 2592000 });

        const { id, firstName, lastName, profileImg, phoneNumber } = user;

        res.status(200).json({
            token,
            user: { id,firstName, lastName, profileImg, phoneNumber, email }
        })

    } catch (err) {
        next(err);
    }
};