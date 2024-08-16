const User = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

exports.getUserProfile = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
};

exports.updateUserProfile = async (req, res) => {
    const schema = Joi.object({
        fName: Joi.string().min(3).required(),
        lName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).optional()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.update(req.body);
    res.send(user);
};
