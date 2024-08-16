const Comment = require('../models/Comment');
const Joi = require('joi');

exports.createPostComment = async (req, res) => {
    const schema = Joi.object({
        postId: Joi.number().integer().required(),
        commentMessage: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = await Comment.create(req.body);
    res.send(comment);
};

exports.getPostComments = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const comments = await Comment.findAndCountAll({
        where: { postId: req.params.postId },
        limit: parseInt(limit),
        offset: parseInt(offset)
    });

    res.send({
        total: comments.count,
        pages: Math.ceil(comments.count / limit),
        data: comments.rows
    });
};
